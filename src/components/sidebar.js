import {  LogoutOutlined } from '@mui/icons-material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logoutUser } from '../redux/user/userSlice'
import { navItems } from '../utils/navItems'


const SideBar = () => {

    const dispatch = useDispatch()

  return (
    <aside className='md:w-52 pr-5 pt-5 md:fixed border-r border-grey-border h-screen'>
        <ul className='text-white font-normal flex flex-col gap-10'>
            {
                navItems.map((item) => {
                    return(
                        <li className='hover:text-primary-color' key={item.id}>
                            <NavLink to={item.link} className={({isActive}) => isActive ? 'text-primary-color font-medium' : 'text-white hover:text-primary-color'}> {item.icon} <span className='hidden md:inline-block md:pl-3'>{item.title}</span>
                            </NavLink>
                        </li>
                    )
                })
            }
           <li className='hover:text-primary-color cursor-pointer' onClick={() => dispatch(logoutUser("Logging out..."))}><LogoutOutlined /><span className='hidden md:inline-block  md:pl-3'>Log out</span></li>
        </ul>
    </aside>
  )
}
export default SideBar