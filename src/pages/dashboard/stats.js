import React from 'react'

const Stats = () => {
  return (
    <div className='grid grid-cols-3 gap-8'>
      <div>
        <div className='bg-[#C19702]  h-40 flex flex-col justify-center align-middle text-center rounded-md mb-5'>
          <h1 className='font-bold text-6xl text-white mb-2'>20🙂</h1>
          <p className='text-secondary-color font-medium'>Pending Applications</p>
        </div>
        <div className='bg-primary-color  h-40 flex flex-col justify-center align-middle text-center rounded-md mb-5'>
          <h1 className='font-bold text-6xl text-white mb-2'>28🤩</h1>
          <p className='text-secondary-color font-medium'>Interview Scheduled</p>
        </div>
        <div className='bg-[#fd3d3d]  h-40 flex flex-col justify-center align-middle text-center rounded-md'>
          <h1 className='font-bold text-6xl text-white mb-2'>10😔</h1>
          <p className='text-secondary-color font-medium'>Declined Applications</p>
        </div>
      </div>
      <div className='col-span-2'>
      startter
      </div>
    </div>
  )
}

export default Stats