import React from 'react'
import TopNav from './top-nav'

const Layout = ({children}) => {
  return (
    <main className="bg-secondary-color h-screen min-h-full">
        <TopNav />
        <div className="px-6 md:px-10">
            {children}
        </div>
    </main>
  )
}

export default Layout