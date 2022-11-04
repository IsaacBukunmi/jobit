import React from 'react'

const AuthWrapper = ({title, subTitle, children}) => {
  return (
    <div className='bg-white w-full md:w-[25rem] px-5 py-5 sm:px-10 sm:py-10  pt-8 rounded-2xl'>
        <div className='mb-3 text-center'>
            <h3 className='text-3xl mb-2'>{title}</h3>
            <p className='w-4/5 m-auto'>{subTitle}</p>
        </div>
        {children}
    </div>
  )
}

export default AuthWrapper