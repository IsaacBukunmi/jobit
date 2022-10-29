import { configureStore } from '@reduxjs/toolkit';
import jobSlice from './job/jobSlice';
import jobListingSlice from './job/jobListingSlice';
import userSlice from './user/userSlice';
import allJobsSlice from './job/allJobsSlice';


export const store = configureStore({
    reducer:{
        auth: userSlice,
        job: jobSlice,
        allJobs: allJobsSlice, 
        jobListing: jobListingSlice
    }
})