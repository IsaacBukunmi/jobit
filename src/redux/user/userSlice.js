import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { LOGIN, REGISTER, UPDATE } from '../../utils/endpoints';
import { addUserToLocalStorage, getUserFromStorage, removeUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
    isLoading: false,
    user: getUserFromStorage()
}

export const registerUser = createAsyncThunk('user/registerUser', 
    async(user, thunkAPI) => {
        try {
            const resp = await customFetch.post(REGISTER, user)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

export const loginUser = createAsyncThunk('user/loginUser', 
    async(user, thunkAPI) => {
        try {
            const resp = await customFetch.post(LOGIN, user)
            return resp.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)

export const updateUser = createAsyncThunk('user/updateUser',
    async(user, thunkAPI) => {
        try{
            const resp = await customFetch.patch(UPDATE, user, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
                },
                })
            return resp.data
        } catch(error){
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    }
)
   

const userSlice = createSlice({
    name:"auth", 
    initialState,
    reducers:{
        logoutUser: (state) => {
            state.user = null
            removeUserFromLocalStorage()
            toast.success("Logged out successfully")
        }
    },
    extraReducers:{
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, {payload}) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Hello There ${user.name}`);
        },
        [registerUser.rejected]: (state , { payload }) => {
            state.isLoading = false
            toast.error(payload);
        },
        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, {payload}) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success(`Welcome ${user.name}`);
        },
        [loginUser.rejected]: (state , { payload }) => {
            state.isLoading = false
            toast.error(payload);
        },
        [updateUser.pending]: (state) => {
            state.isLoading = true
        },
        [updateUser.fulfilled]: (state, {payload}) => {
            const { user } = payload
            state.isLoading = false
            state.user = user
            addUserToLocalStorage(user)
            toast.success('Updated Profile');
        },
        [updateUser.rejected]: (state , { payload }) => {
            state.isLoading = false
            toast.error(payload);
        }
    }
})

export const { logoutUser } = userSlice.actions

export default userSlice.reducer

