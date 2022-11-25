import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import customFetch from "../../utils/axios"
import { JOBS } from "../../utils/endpoints"
import { getUserFromStorage } from "../../utils/localStorage"
import { logoutUser } from "../user/userSlice"
import { getAllJobs, hideLoading, showLoading } from "./allJobsSlice"


const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    isEditing: false,
    editJobId: '',
}

export const createJobApplication = createAsyncThunk('job/createJobApplication', 
    async (job, thunkAPI) => {
        try {
            const resp = await customFetch.post(JOBS, job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
                },
            });
            thunkAPI.dispatch(clearValues());
            return resp.data;
        } catch (error) {
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...')) ;
              }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const deleteJobApplication = createAsyncThunk('job/deleteJobApplication',
    async (jobId, thunkAPI) => {
        thunkAPI.dispatch(showLoading());
        try {
            const resp = await customFetch.delete(`${JOBS}/${jobId}`, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
                },
            });
            thunkAPI.dispatch(getAllJobs());
            return resp.data;
        } catch (error) {
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...')) ;
              }
            thunkAPI.dispatch(hideLoading());
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const editJobApplication = createAsyncThunk(
    'job/editJobApplication',
    async ({ jobId, job }, thunkAPI) => {
      try {
        const resp = await customFetch.patch(`${JOBS}/${jobId}`, job, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
          },
        });
        thunkAPI.dispatch(clearValues());
        thunkAPI.dispatch(getAllJobs())
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );



const jobSlice = createSlice({
    name:'job',
    initialState,
    reducers:{
        handleChange: (state, {payload: {name, value}}) => {
            state[name] =  value
        },
        clearValues:() => {
            return {
                ...initialState,
                jobLocation:getUserFromStorage()?.location || ""
            }
        },
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload };
        },
    },
    extraReducers: {
        [createJobApplication.pending]: (state) => {
          state.isLoading = true;
        },
        [createJobApplication.fulfilled]: (state, action) => {
          state.isLoading = false;
          toast.success('Job Application Added');
        },
        [createJobApplication.rejected]: (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload);
        },
        [deleteJobApplication.fulfilled]: (state, {payload}) => {
            toast.success('Job Application Deleted');
        },
        [editJobApplication.pending]: (state) => {
            state.isLoading = true;
        },
        [editJobApplication.fulfilled]: (state) => {
            state.isLoading = false;
            toast.success('Job Application Updated');
        },
        [editJobApplication.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
        },
    }
})

export const { handleChange, clearValues, setEditJob } = jobSlice.actions;


export default jobSlice.reducer