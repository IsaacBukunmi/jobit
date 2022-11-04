import React from 'react'
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

const ListingDetails = () => {

    const location = useLocation()
    const dispatch = useDispatch()
    const { user  } = useSelector((state) => state.auth)
    const { isLoading } = useSelector((state) => state.job)
    const { job_details } = location.state

    const handleAddJobPosting = () => {
        if(user){
            dispatch(createJobApplication({ 
                position: job_details?.job_title,
                company: job_details?.employer_name, 
                jobLocation: `${job_details?.job_city}, ${job_details?.job_country}`, 
                jobType: job_details?.job_employment_type.replace(" ", "-").toLowerCase(), 
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
                        <ul className='list-disc list-inside'>
                            <li className='text-white'>Click <a className='text-primary-color underline uppercase font-medium' href={job_details?.job_apply_link} target={"_blank"}>Application Link</a> to submit your details.</li>
                            {
                                job_details?.employer_website && 
                                <li className='text-white'>Visit our <a className='text-primary-color underline uppercase font-medium' href={job_details?.employer_website} target={"_blank"}>website</a> to learn more</li>
                            }
                        </ul>
                    </div>
                    <PrimaryButton className="fixed right-6 bottom-0 md:left-10 mb-10 w-[50px] md:w-1/5" onClick={handleAddJobPosting} loading={isLoading}><AddBoxOutlined className='mb-1'/> <span className='hidden md:inline'>Add Job Posting</span></PrimaryButton>
                </div>
            </aside>
            <main className='md:flex-1 md:ml-80 md:pl-5 pb-10'>
                <div className='mb-4'>
                    <div className='flex flex-col md:flex-row md:items-center gap-x-4'>
                        <h2 className='text-white mb-1 sm:scroll-mb-0.5 text-3xl sm:text-4xl'>{job_details?.job_title}</h2>
                        <p className='text-xs border border-primary-color text-primary-color font-medium w-fit rounded p-1'>{job_details?.job_employment_type}</p>
                    </div>
                    <small className='text-gray-300 mt-8 mb-8'><AccessTime fontSize='small'/> {moment(job_details?.job_posted_at_timestamp, "YYYYMMDD").fromNow()  || "Few Days Ago"}</small>
                </div>
                <div className='flex gap-x-4 mb-4'>
                    <div className='h-[60] w-[60px]'>
                        <img className='w-full h-full object-cover rounded-md' src={job_details?.employer_logo} alt="" />
                    </div>
                    <div className='flex flex-col justify-between'>
                        <p className='text-primary-color text-xl font-medium'>{job_details?.employer_name}</p>
                        <p className='text-gray-300'> <Public fontSize='small'/> {job_details?.job_city}</p>
                    </div>
                </div>
                <div className='text-white'>
                    {job_details?.job_description}
                </div>
                {
                    job_details?.job_highlights?.Qualifications &&
                    <div className='mt-8'>
                        <h4 className='text-white text-lg'>Qualifications</h4>
                        <ul className='list-disc text-white list-inside'> 
                            {
                                job_details?.job_highlights?.Qualifications?.map((item) => 
                                <li key={item}>{item}</li>)
                            }
                        </ul>
                    </div>
                }
                {
                    job_details?.job_highlights?.Responsibilities &&
                    <div className='mt-8'>
                        <h4 className='text-white text-lg'>Responsibilities</h4>
                        <ul className='list-disc text-white list-inside'>
                            {
                                job_details?.job_highlights?.Responsibilities?.map((item) => 
                                <li key={item}>{item}</li>)
                            }
                        </ul>
                    </div>
                }
                <SecondaryButton className="text-primary-color mt-4" onClick={() => window.open(job_details?.job_apply_link)}>Apply Now <ArrowForward fontSize='small'/></SecondaryButton>
            </main>
        </div>
    </Layout>
  )
}

export default ListingDetails