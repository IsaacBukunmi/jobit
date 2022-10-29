import { SearchOutlined, } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/button';
import Empty from '../../components/empty';
import { Input, Select } from '../../components/input'
import JobCard from '../../components/job-card';
import { Loading } from '../../components/loading';
import { getAllJobs } from '../../redux/job/allJobsSlice';
import { routes } from '../../utils/routes';

const AllJobs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { sortOptions, isLoading, jobs } = useSelector(state => state.allJobs)

  const otherOptions = [
    "All", "Full Time", "Remote", "Part Time", "Internship", "Interview", "Declined", "Pending"
  ]

  const handleSearch = () => {

  }

  console.log(jobs)

  useEffect(() => {
    dispatch(getAllJobs())
  }, [])

  if(isLoading){
    return(
      <Loading />
    )
  }

  if(jobs.length === 0){
    return(
      <Empty>
        <p className='text-center mb-4'>No Job Application added yet</p>
        <PrimaryButton className="w-44 self-center my-0 mx-auto" onClick={() => navigate(routes.ADD_JOB)}>Add Job</PrimaryButton>
      </Empty>
    )
  }

  

  return (
    <div className='pb-10'>
      <div className='mb-5 flex justify-between'>
        <h2 className='text-3xl text-white'>All Job Applications</h2>
        <div className='relative'>
          <Input  className='pl-9 w-full md:w-80' type="search" placeholder="Search Job" name="search" handleChange={handleSearch}/>
          <div className='absolute top-3 left-2'>
            <SearchOutlined className='text-gray'/>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 mb-6'>
        {
          otherOptions.map((item) => (
            <div className='min-w-[70px] rounded py-2 px-4 bg-primary-transparent text-primary-color text-center cursor-pointer border-2 border-secondary-color hover:border-2 hover:border-primary-color '>{item}</div>
          ))
        }
      </div>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-2xl text-white'>{jobs.length} Results found</h3>
        <Select 
          placeholder="Job Sort" 
          name="status" 
          className="w-56" 
          labelStyle="text-white" 
          // value={status}
          options={sortOptions} 
          // handleChange={handleJobInput}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {
          jobs?.map((job) => {
            return(
              <JobCard key={job._id} {...job}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllJobs