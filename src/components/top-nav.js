import { HdrStrong } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/images/jobit-logo.png'
import { routes } from '../utils/routes'

const TopNav = () => {
  const { user } = useSelector((state) =>  state.auth)
  const navigate = useNavigate()

  return (
    <nav className='bg-secondary-color flex justify-between text-white py-4 border-b border-grey-border px-6 md:px-10 sticky top-0 left-0 z-10'>
      <div onClick={() => navigate(routes.HOME)} className="cursor-pointer">
        <p className='text-white font-bold text-lg'>J<span className='text-primary-color'>ob</span>it <HdrStrong className='text-primary-color'/></p>
      </div>
      {
        user ? 
        <div className='flex gap-3'>
          <Link to="/">Dashboard</Link>
          <p className='border-l border-gray-400 pl-3'>Hi, {user.name}</p>
        </div> :
        <ul className='flex gap-x-6'>
          <li className='cursor-pointer hover:text-primary-color'><Link to="/login">Log In</Link></li>
          <li className='cursor-pointer hover:text-primary-color'><Link to="/register">Sign Up</Link></li>
      </ul>
      }
    </nav>
  )
}

export default TopNav