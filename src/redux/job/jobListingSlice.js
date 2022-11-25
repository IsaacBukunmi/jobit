import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    query:"Software Developer",
    country:"gb",
    location:"",
    page:1,
    full_time: 0,
    part_time:0,
}


const jobListingSlice = createSlice({
    name:'jobListing',
    initialState,
    reducers:{
        handleChange:(state,{payload:{name, value}}) => {
            state[name] = value
        },
        handlePage:(state, {payload})=>{
            state.page = payload
        }
    }
})

export const { handleChange, handlePage } = jobListingSlice.actions
export default jobListingSlice.reducer