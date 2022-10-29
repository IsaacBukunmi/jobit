import React from 'react'
import EmptyImage from '../assets/images/empty.svg'

const Empty = ({children}) => {
  return (
    <div className='flex flex-col items-center justify-center h-[80vh]'>
        <div className='w-56 h-56 text-center mb-4'>
            <img className='w-full h-full object-contain' src={EmptyImage} alt="empty illustration" />
        </div>
        <div className='text-white text-center'>
            {children}
        </div>
    </div>
  )
}

export default Empty