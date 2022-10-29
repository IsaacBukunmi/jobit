import React, { useEffect, useState } from 'react'
import { Checkbox, Input, RadioInput } from './input';
import moment from 'moment';
import axios from 'axios';
import { GET_JOBS } from '../utils/endpoints';
import { PrimaryButton } from './button'
import { useSelector } from 'react-redux';



const ListingResults = () => {

    const { query } = useSelector((state) => state.jobListing)
    console.log(query)

    const [allJobs, setAllJobs] = useState([])
    const [searchTerm, setSearchTerm] = useState("Developer careers frontend backend")


    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    useEffect(() => {
        axios.get(GET_JOBS, {
            params: {
                query: query, 
                num_pages: '10'
            },
            headers:{
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST
            }
          })
          .then(function (response) {
            setAllJobs(response?.data?.data)
          })
          .catch(function (error) {
            console.log(error);
          })    
    }, [searchTerm])

    console.log(allJobs)


    return (
        <>
            <div className="bg-search-bg h-44 mt-10">
                <div className='flex gap-8 justify-center items-center h-full'>
                    <Input  className='w-[50vw]' type="search" placeholder="Title, company, expertise" name="search" handleChange={handleSearch}/>
                    <PrimaryButton  className=' w-40'>Search</PrimaryButton>
                </div>
            </div>
            <div className='md:flex relative pt-10'>
                <aside className='w-full md:w-80 pr-5 md:fixed md:border-r border-grey-border h-full'>
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
                <main className='md:flex-1 md:ml-80 md:pl-5'>
                    <div>
                        {
                            allJobs.map((item) => {
                                return(
                                    <div className='bg-white flex justify-between items-baseline p-4 rounded-md shadow-lg mb-6' key={item?.job_id}>
                                        <div className='flex  gap-3'>
                                            <div className='h-[90px] w-[90px]'>
                                                <img className='w-full h-full object-cover' src={item?.employer_logo} alt="" />
                                            </div>
                                            <div className='self-start'>
                                                <small className='text-secondary-color font-bold text-xs'>{item?.employer_name}</small>
                                                <h2 className='text-secondary-color font-normal text-lg pb-2'>{item?.job_title}</h2>
                                                <p className='text-xs border border-secondary-color text-secondary-color font-medium w-fit rounded p-1'>{item?.job_employment_type}</p>
                                            </div>
                                        </div>
                                        <div className='flex gap-4 text-s text-[#B9BDCF]'>
                                            <p> {`${item?.job_city} ${item?.job_state}`}</p>
                                            <p> {moment(item?.job_posted_at_timestamp, "YYYYMMDD").fromNow()  || "Few Days Ago"}</p>
                                        </div>
                                    </div>
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