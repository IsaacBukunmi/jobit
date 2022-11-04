import React from 'react'
import { Link } from 'react-router-dom'
import ErrorImg from  '../assets/images/error.svg'

const Error = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-white text-center'>
        <div className='w-4/5 md:w-2/5 mb-10'>
            <img className='h-full object-contain' src={ErrorImg} alt="error" />
        </div>
        <div>
            <h2 className='text-6xl'>Oops</h2>
            <p className='text-3xl mb-10'>Something went wrong...</p>
            <Link to="/" className='text-primary-color text-bold underline underline-offset-4'>Go Home</Link>
        </div>
    </div>
  )
}

export default Error