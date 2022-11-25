import React, { useEffect, useState } from 'react'
import { Checkbox, Input, RadioInput } from './input';
import moment from 'moment';
import axios from 'axios';
import { GET_JOBS } from '../utils/endpoints';
import { PrimaryButton, SecondaryButton } from './button'
import { useDispatch, useSelector } from 'react-redux';
import Logo from "../assets/images/volks-logo.jpg"
import ListingCard from './listing-card';
import { mockJobListings } from '../utils/mockData';
import Empty from './empty';
import { RestartAlt } from '@mui/icons-material';
import { Loading } from './loading';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Public } from '@material-ui/icons';
import { handleChange, handlePage } from '../redux/job/jobListingSlice';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'

const initialJobType = {
    "full_time": false, 
    "part_time": false
}

const selectedCountries = [
    {
        id:"united-kingdom",
        value:"gb",
        label:"United Kingdom",
    },
    {
        id:"united-states",
        value:"us",
        label:"United States",
    },
    {
        id:"canada",
        value:"ca",
        label:"Canada",
    },
    {
        id:"netherlands",
        value:"nl",
        label:"Netherlands",
    },
]


const ListingResults = () => {

    const { query, country, location, page, full_time, part_time } = useSelector((state) => state.jobListing)
    console.log(query)

    const [allJobs, setAllJobs] = useState([])
    const [jobsLoading, setJobsLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState({name:"", value:""})
    const [checkedJobType, setCheckedJobType] = useState({name:"", value:false})

    const dispatch = useDispatch()

    const onSearch = (e) => {
        setSearchTerm({name:e.target.name, value:e.target.value})
    }

    const onCountrySelect = (e) => {
        dispatch(handleChange({name:e.target.name, value:e.target.value}))
    }

    const onLocation = (e) => {
        dispatch(handleChange({name:e.target.name, value:e.target.value}))
    }

    const onJobType = (e) => {
        // setCheckedJobType((prevJobType) => ({
        //     ...prevJobType,
        //     [e.target.name]: !checkedJobType[e.target.name]
        // }))
        setCheckedJobType({name:e.target.value, value:!checkedJobType.value})
    }

    console.log(checkedJobType)

    const handleSearchQuery = () => {
        dispatch(handleChange({name:searchTerm.name, value:searchTerm.value}))
    }

    const handleFilterReset = () => {
        setSearchTerm({name:"", value:""})
        setCheckedJobType({name:"", value:false})
        dispatch(handleChange({name:"country", value:"gb"}))
    }


    useEffect(() => {
        setJobsLoading(true)
        axios.get(`${GET_JOBS}/${country}/search/${page}`, {
            params: {
               app_id: process.env.REACT_APP_ADZUNA_APP_ID,
               app_key: process.env.REACT_APP_ADZUNA_APP_KEY,
               what: query,
               where: location,
               full_time:full_time,
               part_time: part_time
            }
          })
          .then(function (response) {
            console.log(response)
            setAllJobs(response?.data?.results)
            setJobsLoading(false)
          })
          .catch(function (error) {
            console.log(error);
            setJobsLoading(false)
          })    
    }, [query, country, location, page, full_time, part_time])

    useEffect(() => {
        dispatch(handleChange({name:checkedJobType.name, value:checkedJobType.value === true ? 1 : 0}))
    }, [checkedJobType])

    useEffect(() => {
        window.scrollTo({top:0, left:0, behavior:'smooth'})
    }, [page])


    return (
        <>
            <div className="bg-search-bg h-40 mt-10 px-4 ">
                <div className='flex justify-center items-center h-full'>
                    <div className='bg-white border-0 rounded-md flex p-1'>
                        <div className='relative'>
                            <Input  className='w-[50vw] md:w-[40vw] rounded-tr-none rounded-br-none border-transparent border-0 ring-0 border-r-0 focus:ring-0 outline-0 pl-8' type="text" name="query" value={searchTerm.value} placeholder="Title, company, expertise" handleChange={onSearch}/>
                            <div className='absolute top-3 left-1'>
                                <WorkOutlineIcon className='text-gray-400'/>
                            </div>      
                        </div>         
                        <PrimaryButton className='bg-primary-color w-28 sm:w-40' onClick={handleSearchQuery}>Search</PrimaryButton>
                    </div>
                </div>
            </div>
            <div className='md:flex relative pt-10'>
                <aside className='w-full md:w-80 pr-5 md:border-r border-grey-border h-auto md:h-screen'>
                    <div>
                        <Checkbox id="full-time" checked={checkedJobType.value} name="full_time" value="full time" label="Full time" handleChange={onJobType}/>
                        {/* <Checkbox id="part-time" checked={checkedJobType["part_time"]} name="part_time" value="part time" label="Part time" handleChange={onJobType}/> */}
                    </div>
                    <div className='mt-8'>
                        <h4 className='font-medium text-gray-300 mb-4'>LOCATION</h4>
                        <div className='relative'>
                            <Input placeholder="City, state, zip code or country" name="location" className="pl-8" type="text" handleChange={onLocation}/>
                            <div className='absolute top-3 left-2'>
                                <Public fontSize='small' className="text-gray-400"/>
                            </div> 
                        </div>
                    </div>
                    <div className='mt-6'>
                        {
                            selectedCountries.map(({id, value, label}) => {
                                return(
                                    <RadioInput id={id} value={value} name="country" label={label} checked={country === value} handleChange={onCountrySelect}/>
                                )
                            })
                        }
                    </div>
                    <div className='mt-8'>
                        <SecondaryButton className='text-primary-color' onClick={handleFilterReset}> <RestartAlt fontSize='small' className='mb-1'/> Reset Filter</SecondaryButton>
                    </div>
                </aside>
                <main className='md:flex-1 md:pl-5 mt-8 pb-8 md:mt-0 md:pb-0'>
                    {
                        jobsLoading ? 
                        <div>
                            <Loading />
                        </div> :
                        allJobs?.length === 0 ? 
                        <Empty>
                            <p className='text-center mb-4'>No Results Found</p>
                        </Empty> :
                        <div className='pb-8'>
                            {
                                allJobs?.map((item) => {
                                    return(
                                        <ListingCard item = {item}/>
                                    )
                                })
                            }
                            <ListingPagination page={page}/>
                        </div>
                    }
                </main>
            </div>
        </>
    )
}

const ListingPagination = ({page}) => {
    const dispatch = useDispatch()

    const buttonTheme = {
        unactive: "border-2 border-gray-500 h-[40px] w-[40px] rounded-md text-center font-medium leading-[40px] cursor-pointer text-gray-500 hover:border-primary-color hover:text-primary-color",
        active: "border-2 bg-primary-color border-primary-color h-[40px] w-[40px] rounded-md text-center font-medium leading-[40px] cursor-pointer text-white"
    }

    
    const handlePrevPage = () => {

        if(page == 1){
            dispatch(handlePage(1))
        }else
        dispatch(handlePage(page - 1))
    }

    const handleNextPage = () => {
        dispatch(handlePage(page + 1))
    }

    return(
        <div>
            <p className='text-right text-gray-500'>Page: <span className='font-bold italic'>{page}</span></p>
            <div className='flex items-center justify-end gap-x-4 mt-4'>
                <div className={`${buttonTheme.unactive}`} onClick={handlePrevPage}>
                    <ArrowBackIos fontSize='small' className="text-gray-500 ml-1 mb-1 hover:text-primary-color"/>
                </div>
                <div className={`${buttonTheme.unactive}`} onClick={handleNextPage}>
                    <ArrowForwardIos fontSize='small' className='text-gray-500 mb-1 hover:text-primary-color'/>  
                </div>
            </div>
        </div>
    )
}

export default ListingResults