import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutUser } from '../redux/user/userSlice'
import { navItems } from '../utils/navItems'

import {  LogoutOutlined } from '@mui/icons-material'

const MobileNav = () => {
    const dispatch = useDispatch()

    return (
       
            <div className='border-t border-grey-border fixed bottom-0 py-3 bg-secondary-color w-[90%]'>
                <ul className='text-white font-normal flex flex-row justify-between'>
                    {
                        navItems.map((item) => {
                            return(
                                <li className='hover:text-primary-color' key={item.id}>
                                    <NavLink to={item.link} className={({isActive}) => isActive ? 'text-primary-color font-medium' : 'text-white hover:text-primary-color'}> {item.icon}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                    <li className='hover:text-primary-color cursor-pointer' onClick={() => dispatch(logoutUser("Logging out..."))}><LogoutOutlined /><span className='hidden md:inline-block  md:pl-3'>Log out</span></li>
                </ul>
            </div>
        
    )
}   

export default MobileNav