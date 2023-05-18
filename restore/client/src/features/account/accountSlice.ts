import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";

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
            const user = await agent.Account.login(data);
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
        try {
            const user = await agent.Account.currentUser();
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkApi.rejectWithValue({ error: error.data })
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
        }
    },
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(signInUserAsync.fulfilled, fetchCurrentUserAsync.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUserAsync.rejected, fetchCurrentUserAsync.rejected), (state, action) => {
            console.log(action.payload);
        })
    })
});

export const { signOut } = accountSlice.actions;