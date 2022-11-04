import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChartsSection from '../../components/charts-section'
import StatsCards from '../../components/stats-cards'
import { getJobStats } from '../../redux/job/allJobsSlice'

const Stats = () => {
  const {isLoading, monthlyApplications, stats} = useSelector(state => state.allJobs)
  const dispatch = useDispatch()

  const {declined, interview, pending} = stats

  useEffect(() => {
    dispatch(getJobStats())
  }, [])

  return (
    <div className='block lg:grid lg:grid-cols-3 gap-8 '>
      <StatsCards declined={declined} interview={interview} pending={pending}/>
      <div className='col-span-2'>
        <ChartsSection data={monthlyApplications}/>
      </div>
    </div>
  )
}

export default Stats