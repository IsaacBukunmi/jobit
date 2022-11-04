import React, { useEffect, useState } from 'react'
import { Checkbox, Input, RadioInput } from './input';
import moment from 'moment';
import axios from 'axios';
import { GET_JOBS } from '../utils/endpoints';
import { PrimaryButton } from './button'
import { useSelector } from 'react-redux';
import Logo from "../assets/images/volks-logo.jpg"
import ListingCard from './listing-card';
import { mockJobListings } from '../utils/mockData';



const ListingResults = () => {

    const { query } = useSelector((state) => state.jobListing)
    console.log(query)

    const [allJobs, setAllJobs] = useState([])
    const [searchTerm, setSearchTerm] = useState("Developer careers frontend backend")


    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
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


    return (
        <>
            <div className="bg-search-bg h-40 mt-10 px-4">
                <div className='flex flex-col md:flex-row gap-8 justify-center md:items-center h-full'>
                    <Input  className='w-full md:w-[50vw]' type="search" placeholder="Title, company, expertise" name="search" handleChange={handleSearch}/>
                    <PrimaryButton  className='bg-primary-color w-full md:w-40'>Search</PrimaryButton>
                </div>
            </div>
            <div className='md:flex relative pt-10'>
                <aside className='w-full md:w-80 pr-5 md:border-r border-grey-border h-auto md:h-screen'>
                    <div>
                        <Checkbox id="full-time" value="" label="Full time" />
                        <Checkbox id="Part time" value="" label="Part time" />
                    </div>
                    <div className='mt-8'>
                        <h4 className='font-medium text-gray-300 mb-4'>LOCATION</h4>
                        <Input placeholder="City, state, zip code or country"/>
                    </div>
                    <div className='mt-6'>
                        <RadioInput id="london" value="" label="London" />
                        <RadioInput id="amsterdam" value="" label="Amsterdam" />
                        <RadioInput id="new-york" value="" label="New York" />
                        <RadioInput id="Berlin" value="" label="berlin" />
                    </div>
                </aside>
                <main className='md:flex-1 md:pl-5'>
                    <div>
                        {
                            (allJobs.length !== 0 ? allJobs : mockJobListings).map((item) => {
                                return(
                                    <ListingCard item = {item}/>
                                )
                            })
                        }
                    </div>
                </main>
            </div>
        </>
    )
}

export default ListingResults