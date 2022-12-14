import React, {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Layout from '../components/layout'
import { routes } from '../utils/routes'
import moment from 'moment'
import { AccessTime, AddBoxOutlined, ArrowForward, KeyboardBackspace, Public } from '@material-ui/icons'
import { PrimaryButton, SecondaryButton } from '../components/button'
import { useDispatch, useSelector } from 'react-redux'
import { createJobApplication } from '../redux/job/jobSlice'
import { toast } from 'react-toastify'
import { getAllJobs } from '../redux/job/allJobsSlice'
import axios from 'axios'
import { GET_JOBS } from '../utils/endpoints'
import ReactTextFormat from 'react-text-format';
import { getLocalTimeFormat } from '../utils/helper'

const ListingDetails = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const { user  } = useSelector((state) => state.auth)
    const { isLoading } = useSelector((state) => state.job)
    const { job_details } = location.state

    const handleAddJobPosting = () => {
        if(user){
            dispatch(createJobApplication({ 
                position: job_details?.title,
                company: job_details?.company.display_name, 
                jobLocation: job_details?.location?.display_name, 
                jobType: job_details?.detected_extensions?.schedule_type(job_details?.contract_time || job_details?.contract_type)?.replace("_", " ").toLowerCase(), 
                status : "pending"
            }));
            dispatch(getAllJobs())
        }else{
            toast.error("Login to add job posting to your application list")
        }
    }

  
  return (
    <Layout>
        <div className='flex flex-col md:flex-row relative pt-10'>
            <aside className='w-full md:mb-0 mb-5 md:w-80 pr-5 md:fixed md:border-r border-grey-border h-full'>
                <div className='flex flex-col justify-between'>
                    <Link to={routes.LISTINGS} className="text-primary-color"><KeyboardBackspace className="text-white"/> Back to Search</Link>
                    <div className=''>
                        <h3 className='text-gray-300 text-lg mt-8 mb-2 uppercase font-medium'>How to apply</h3>
                        <p className='text-white'>Click  <a href={job_details?.redirect_url} target={"_blank"} className='text-primary-color underline font-medium'>here</a> to apply to job</p>
                    </div>
                    <PrimaryButton className="fixed right-6 bottom-0 md:left-10 mb-10 w-[50px] md:w-1/5" onClick={handleAddJobPosting} loading={isLoading}><AddBoxOutlined className='mb-1'/> <span className='hidden md:inline'>Add Job Posting</span></PrimaryButton>
                </div>
            </aside>
            <main className='md:flex-1 md:ml-80 md:pl-5 pb-10'>
                <div className='mb-4'>
                    <div className='flex flex-col md:flex-row md:items-center gap-x-4'>
                        <h2 className='text-white mb-1 sm:scroll-mb-0.5 text-3xl sm:text-4xl'>{job_details?.title}</h2>
                        <p className='text-xs shrink-0 border border-primary-color text-primary-color font-medium w-fit rounded p-1'>{(job_details?.contract_time || job_details?.contract_type)?.replace("_", " ") || "full time"}</p>
                    </div>
                    <small className='text-gray-300 mt-8 mb-8'><AccessTime fontSize='small'/> {getLocalTimeFormat(job_details?.created) || "Few Days Ago"}</small>
                </div>
                <div className='flex gap-x-4 mb-4'>
                    {
                        job_details?.thumbnail ?
                        <div className='h-[60px] w-[60px]'>
                            <img className='w-full h-full object-cover rounded-md' src={job_details?.thumbnail} alt="" />
                        </div> :
                        <div className={`bg-[#000] h-[60px] w-[60px] rounded-md text-white text-center mx-0 my-auto leading-[60px] text-5xl`}>
                            {job_details?.company.display_name?.charAt(0)}
                        </div>
                    }
                    <div className='flex flex-col justify-between'>
                        <p className='text-primary-color text-xl font-medium'>{job_details?.company?.display_name}</p>
                        <p className='text-gray-300'> <Public fontSize='small'/> {job_details?.location?.display_name}</p>
                    </div>
                </div>
                <ReactTextFormat>
                    <div className='text-white'>
                        {job_details?.description}
                    </div>
                </ReactTextFormat>
                <SecondaryButton className="text-primary-color mt-4" onClick={() => window.open(job_details?.redirect_url)}>Apply Now <ArrowForward fontSize='small'/></SecondaryButton>
            </main>
        </div>
    </Layout>
  )
}

export default ListingDetails