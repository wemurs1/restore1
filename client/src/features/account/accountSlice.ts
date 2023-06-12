import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUserAsync = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkApi) => {
        try {
            const userDto = await agent.Account.login(data);
            const { basket, ...user } = userDto;
            if (basket) thunkApi.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchCurrentUserAsync = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkApi) => {
        thunkApi.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDto = await agent.Account.currentUser();
            const { basket, ...user } = userDto;
            if (basket) thunkApi.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
);

export const accountSlice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUser: (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = { ...action.payload, roles: typeof (roles) === 'string' ? [roles] : roles };
        }
    },
    extraReducers: (builder => {
        builder.addCase(signInUserAsync.rejected, (state, action) => {
            throw action.payload;
        });
        builder.addCase(fetchCurrentUserAsync.rejected, (state) => {
            console.log(state.user);
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            router.navigate('/');
        })
        builder.addMatcher(isAnyOf(signInUserAsync.fulfilled, fetchCurrentUserAsync.fulfilled), (state, action) => {
            let claims = JSON.parse(atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            state.user = { ...action.payload, roles: typeof (roles) === 'string' ? [roles] : roles };
        });
    })
});

export const { signOut, setUser } = accountSlice.actions;