import React from 'react'
import { Outlet } from 'react-router'
import Layout from '../../components/layout'
import MobileNav from '../../components/mobile-nav'
import SideBar from '../../components/sidebar'

const DashboardLayout = () => {
  return (
    <Layout>
      <div className='md:flex'>
        <div className='hidden md:block'>
          <SideBar />
        </div>      
        <main className='md:ml-52 pt-5 md:pl-5 w-full pb-20 md:pb-0'>
            <Outlet />
        </main>
        <div className='md:hidden w-full'>
          <MobileNav />
        </div>
      </div>
    </Layout>
  )
}

export default DashboardLayout