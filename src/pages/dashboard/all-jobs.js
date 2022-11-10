import { SearchOutlined, } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/button';
import Empty from '../../components/empty';
import { Input, Select } from '../../components/input'
import JobCard from '../../components/job-card';
import { Loading } from '../../components/loading';
import Pagination from '../../components/pagination';
import { getAllJobs, handleChange } from '../../redux/job/allJobsSlice';
import { routes } from '../../utils/routes';

const generalTagTheme = "min-w-[70px] rounded py-2 px-4 bg-primary-transparent text-primary-color text-center cursor-pointer capitalize"

const tagTheme = {
  unactive:`${generalTagTheme} border-2 border-secondary-color hover:border-2, hover:border-primary-color`,
  active:`${generalTagTheme} border-2 border-primary-color`
}

const AllJobs = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { search, searchType, searchStatus, sortOptions, sort,  page, isLoading, jobs, totalJobs, numOfPages } = useSelector(state => state.allJobs)
  const { statusOptions, jobTypeOptions } = useSelector(state => state.job)

  const handleSearch = (e) => {
   if(isLoading) return
    dispatch(handleChange({name:e.target.name, value:e.target.value}))
  }

  const handleTagSelect = (name, value) => {
    if(isLoading) return
    dispatch(handleChange({name:name, value:value}))

  }

  useEffect(() => {
    dispatch(getAllJobs())
  }, [page, search, searchStatus, searchType, sort])


  return (
    <div className='pb-10'>
      <div className='mb-5  sm:flex sm:justify-between'>
        <h2 className='text-3xl text-white mb-5 sm:mb-0'>All Job Applications</h2>
        <div className='relative'>
          <Input  className='pl-9 w-full md:w-80' type="search" placeholder="Search Job" name="search" value={search} handleChange={handleSearch}/>
          <div className='absolute top-3 left-2'>
            <SearchOutlined className='text-gray'/>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 mb-6'>
          <div className={`${(searchType === "all" && searchStatus === "all") ? tagTheme.active : tagTheme.unactive}`}  onClick={() => {
            handleTagSelect("searchType", "all")
            handleTagSelect("searchStatus", "all")
            }}>
            All
          </div>
        {
          jobTypeOptions.map((item) => {
            return (
            <div className={`${(searchType === item) ? tagTheme.active : tagTheme.unactive}`} 
            onClick={() => { 
              handleTagSelect("searchType", item)
              handleTagSelect("searchStatus", "all")
            }}>  
              {item.replace("-", " ")}
            </div>
          )})
        }
        {
          statusOptions.map((item) => (
            <div className={`${(searchStatus === item) ? tagTheme.active : tagTheme.unactive}`}  onClick={() => { 
              handleTagSelect("searchStatus", item)
              handleTagSelect("searchType", "all")
            }}>  
              {item.replace("-", " ")}
            </div>
          ))
        }
      </div>
      {
        isLoading ? 
        <div>
          <Loading />
        </div> : jobs.length === 0 ?
        <Empty>
          <p className='text-center mb-4'>No Job Application found</p>
          <PrimaryButton className="w-44 self-center my-0 mx-auto" onClick={() => navigate(routes.ADD_JOB)}>Add Job</PrimaryButton>
        </Empty> :
        <div>
        <div className='flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between mb-4 '>
            <h3 className='text-2xl text-white mb-4 sm:mb-0'>{totalJobs} {(searchType !== "all" && searchType.replace("-", " ")) || (searchStatus !== "all" && searchStatus)} job{totalJobs > 1 && "s"} found</h3>
            <Select 
              placeholder="Job Sort" 
              name="sort" 
              className="sm:w-56" 
              labelStyle="text-white" 
              value={sort}
              options={sortOptions} 
              handleChange={handleSearch}
            />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
              jobs?.map((job) => {
                return(
                  <JobCard key={job._id} {...job}/>
                )
              })
            }
          </div>
            { numOfPages > 1 &&
              <div>
                <Pagination />
              </div>
            }
        </div>
      }
    </div>
  )
}

export default AllJobs