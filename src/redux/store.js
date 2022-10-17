import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './job/jobSlice';
import userSlice from './user/userSlice';


export const store = configureStore({
    reducer:{
        auth: userSlice,
        job: jobSlice
    }
})