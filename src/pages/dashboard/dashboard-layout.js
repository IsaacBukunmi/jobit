import React from 'react'
import { Outlet } from 'react-router'
import Layout from '../../components/layout'
import SideBar from '../../components/sidebar'

const DashboardLayout = () => {
  return (
    <Layout>
      <div className='flex'>      
        <SideBar />
        <main className='md:ml-52 pt-5 pl-5 w-full'>
            <Outlet />
        </main>
      </div>
    </Layout>
  )
}

export default DashboardLayout