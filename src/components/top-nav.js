import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/images/jobit-logo.png'

const TopNav = () => {
  return (
    <nav className='flex justify-between text-white py-4 border-b border-grey-border px-14'>
      <div>
        <p className='text-white font-bold'>Jobit</p>
      </div>
      <ul className='flex gap-x-6'>
        <li className='cursor-pointer hover:text-primary-color'><Link to="/login">Log In</Link></li>
        <li className='cursor-pointer hover:text-primary-color'><Link to="/register">Sign Up</Link></li>
      </ul>
    </nav>
  )
}

export default TopNav