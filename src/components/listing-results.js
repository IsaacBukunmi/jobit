import React, { useEffect, useState } from 'react'
import { Checkbox, Input, RadioInput } from './input';
import moment from 'moment';
import axios from 'axios';
import { GET_JOBS } from '../utils/endpoints';
import { PrimaryButton, SecondaryButton } from './button'
import { useSelector } from 'react-redux';
import Logo from "../assets/images/volks-logo.jpg"
import ListingCard from './listing-card';
import { mockJobListings } from '../utils/mockData';
import Empty from './empty';
import { RestartAlt } from '@mui/icons-material';



const ListingResults = () => {

    const { query } = useSelector((state) => state.jobListing)
    console.log(query)

    const [allJobs, setAllJobs] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [checkedLocation, setCheckedLocation] = useState("")
    const [searchResult, setSearchResult] = useState(mockJobListings)


    const onSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const onLocation = (e) => {
        setCheckedLocation(e.target.value)
        const locationTerm = e.target.value.toLowerCase()
        let filterResults =  mockJobListings.filter((ele) => (ele.job_city.toLowerCase().includes(locationTerm)) || (ele.job_country.toLowerCase().includes(locationTerm)))
        setSearchResult(filterResults)
    }

    const handleSearchResults = () => {
        const searchTermCopy = searchTerm.toLowerCase()
        let filterResults =  mockJobListings.filter((ele) => (ele.job_title.toLowerCase().includes(searchTermCopy)) || (ele.employer_name.toLowerCase().includes(searchTermCopy)))
        setSearchResult(filterResults)
    }

    const handleFilterReset = () => {
        setSearchResult(mockJobListings)
        setCheckedLocation("")
        setSearchTerm("")
    }

    useEffect(() => {
        // axios.get(GET_JOBS, {
        //     params: {
        //         query: query, 
        //         num_pages: '10'
        //     },
        //     headers:{
        //         'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        //         'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
        //     }
        //   })
        //   .then(function (response) {
        //     setAllJobs(response?.data?.data)
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   })    
    }, [searchTerm])

    console.log(allJobs)

    useEffect(() =>{
        if(searchTerm == ""){
            setSearchResult(mockJobListings)
        }
    }, [searchTerm])

    return (
        <>
            <div className="bg-search-bg h-40 mt-10 px-4">
                <div className='flex flex-col md:flex-row gap-8 justify-center md:items-center h-full'>
                    <Input  className='w-full md:w-[50vw]' type="text" value={searchTerm} placeholder="Title, company, expertise" name="search" handleChange={onSearch}/>
                    <PrimaryButton  className='bg-primary-color w-full md:w-40' onClick={handleSearchResults}>Search</PrimaryButton>
                </div>
            </div>
            <div className='md:flex relative pt-10'>
                <aside className='w-full md:w-80 pr-5 md:border-r border-grey-border h-auto md:h-screen'>
                    <div>
                        <Checkbox id="full-time" value="" label="Full time"  />
                        <Checkbox id="Part time" value="" label="Part time" />
                    </div>
                    <div className='mt-8'>
                        <h4 className='font-medium text-gray-300 mb-4'>LOCATION</h4>
                        <Input placeholder="City, state, zip code or country" type="text" handleChange={onLocation}/>
                    </div>
                    <div className='mt-6'>
                        <RadioInput id="london" value="london" name="location" label="London" checked={checkedLocation === "london"} handleChange={onLocation}/>
                        <RadioInput id="amsterdam" value="amsterdam" name="location" label="Amsterdam" checked={checkedLocation === "amsterdam"} handleChange={onLocation} />
                        <RadioInput id="new-york" value="new york" name="location" label="New York" checked={checkedLocation === "new york"} handleChange={onLocation} />
                        <RadioInput id="Berlin" value="berlin" name="location" label="Berlin" checked={checkedLocation === "berlin"}  handleChange={onLocation}/>
                    </div>
                    <div className='mt-8'>
                        <SecondaryButton className='text-primary-color' onClick={handleFilterReset}> <RestartAlt fontSize='small' className='mb-1'/> Reset Filter</SecondaryButton>
                    </div>
                </aside>
                <main className='md:flex-1 md:pl-5'>
                    {
                        searchResult.length === 0 ? 
                        <Empty>
                            <p className='text-center mb-4'>No Results Found</p>
                        </Empty> :
                        <div>
                            {
                                (allJobs.length !== 0 ? allJobs : searchResult).map((item) => {
                                    return(
                                        <ListingCard item = {item}/>
                                    )
                                })
                            }
                        </div>
                    }
                </main>
            </div>
        </>
    )
}

export default ListingResults