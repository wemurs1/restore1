import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Order, OrderParams } from "../../app/models/order";
import { MetaData } from "../../app/models/pagination";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface OrderState {
    ordersLoaded: boolean;
    status: string;
    orderParams: OrderParams;
    metaData: MetaData | null;
    orderNumber: number;
}

const ordersAdapter = createEntityAdapter<Order>();

function getAxiosParams(orderParams: OrderParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', orderParams.pageNumber.toString());
    params.append('pageSize', orderParams.pageSize.toString());
    return params;
}

function initParams() {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderNumber: 0
    }
}

export const fetchOrdersAsync = createAsyncThunk<Order[], void, { state: RootState }>(
    'order/fetchOrdersAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().order.orderParams);
        try {
            const response = await agent.Orders.list(params);
            thunkAPI.dispatch(setOrderMetaData(response.metaData));
            return response.items;
        } catch (error: any) {
            thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchOrderAsync = createAsyncThunk<Order, number>(
    'order/fetchOrderAsync',
    async (orderId, thunkAPI) => {
        try {
            const order = await agent.Orders.fetch(orderId);
            return order;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const createOrderAsync = createAsyncThunk<number, any, { state: RootState }>(
    'order/createOrderAsync',
    async ({ saveAddress, shippingAddress }, thunkAPI) => {
        try {
            const orderNumber = await agent.Orders.create({ saveAddress, shippingAddress });
            if (orderNumber) {
                const params = getAxiosParams(thunkAPI.getState().order.orderParams);
                const response = await agent.Orders.refreshMetaData(params);
                thunkAPI.dispatch(setOrderMetaData(response.metaData));

            }
            return orderNumber;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState: ordersAdapter.getInitialState<OrderState>({
        ordersLoaded: false,
        status: 'idle',
        orderParams: initParams(),
        metaData: null,
        orderNumber: 0
    }),
    reducers: {
        setOrderParams: (state, action) => {
            state.ordersLoaded = false;
            state.orderParams = { ...state.orderParams, ...action.payload, pageNumber: 1 }
        },
        setPageNumber: (state, action) => {
            state.ordersLoaded = false;
            state.orderParams = { ...state.orderParams, ...action.payload }
        },
        resetOrderParams: (state) => {
            state.orderParams = initParams();
        },
        setOrderMetaData: (state, action) => {
            state.metaData = action.payload
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchOrdersAsync.pending, (state) => {
            state.status = 'pendingFetchOrders'
        });
        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            ordersAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.ordersLoaded = true
        });
        builder.addCase(fetchOrdersAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle'
        });
        builder.addCase(fetchOrderAsync.pending, state => {
            state.status = 'pendingFetchOrder'
        });
        builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
            ordersAdapter.upsertOne(state, action.payload);
            state.status = 'idle'
        });
        builder.addCase(fetchOrderAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle'
        });
        builder.addCase(createOrderAsync.pending, state => {
            state.status = 'pendingCreate'
        });
        builder.addCase(createOrderAsync.fulfilled, (state, action) => {
            state.orderNumber = action.payload;
            state.status = 'idle'
        });
        builder.addCase(createOrderAsync.rejected, state => {
            state.status = 'idle'
        });
    })
});

export const orderSelectors = ordersAdapter.getSelectors((state: RootState) => state.order);

export const { setOrderParams, resetOrderParams, setOrderMetaData, setPageNumber } = orderSlice.actions;