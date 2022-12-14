import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import { JOBS, STATS } from "../../utils/endpoints";
import { logoutUser } from "../user/userSlice";

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
};
  
const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllJobs = createAsyncThunk(
    'allJobs/getJobs',
    async (_, thunkAPI) => {

      const {page, search, searchStatus, searchType, sort} = thunkAPI.getState().allJobs

      let url = `${JOBS}?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`;
      if(search){
        url = url + `&search=${search}`;
      }
  
      try {
        const resp = await customFetch.get(url, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
          },
        });
        console.log(resp.data)
        return resp.data;
    
      } catch (error) {
        if (error.response.status === 401) {
          thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...')) ;
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );

export const getJobStats = createAsyncThunk('allJobs/getJobStats', 
  async (_, thunkAPI) => {
    try {
      const resp = await customFetch.get(STATS, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().auth.user.token}`,
        }
      });
      console.log(resp.data);
      return resp.data;
    }catch (error) {
      if (error.response.status === 401) {
        thunkAPI.dispatch(logoutUser('Unauthorized! Logging Out...')) ;
      }
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


const allJobsSlice = createSlice({
    name:'allJobs',
    initialState,
    reducers:{
      showLoading: (state) => {
        state.isLoading = true
      },
      hideLoading: (state) => {
        state.isLoading = false
      },
      handleChange: (state, { payload: { name, value } }) => {
        state.page = 1;
        state[name] = value;
      },
      changePage: (state, {payload}) => {
        state.page = payload
      }
    },
    extraReducers: {
        [getAllJobs.pending]: (state) => {
          state.isLoading = true;
        },
        [getAllJobs.fulfilled]: (state, { payload }) => {
          state.isLoading = false;
          state.jobs = payload.jobs;
          state.numOfPages = payload.numOfPages;
          state.totalJobs = payload.totalJobs;
        },
        [getAllJobs.rejected]: (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload);
        },
        [getJobStats.pending]: (state) => {
          state.isLoading = true;
        },
        [getJobStats.fulfilled]: (state, { payload }) => {
          state.isLoading = false;
          state.stats = payload.defaultStats;
          state.monthlyApplications = payload.monthlyApplications;
        },
        [getJobStats.rejected]: (state, { payload }) => {
          state.isLoading = false;
          toast.error(payload);
        },
    }
    
})

export const {showLoading, hideLoading, handleChange, changePage} = allJobsSlice.actions

export default allJobsSlice.reducer