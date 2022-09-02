import React from 'react'
import { Checkbox, Input, RadioInput } from './input'
import Logo from '../assets/images/jobit-logo.png'

const ListingResults = () => {
  return (
    <div className='flex relative pt-10'>
        <aside className='w-80 pr-5 fixed border-r border-grey-border h-full'>
            <div>
                <Checkbox id="full-time" value="" label="Full time" />
                <Checkbox id="Part time" value="" label="Part time" />
            </div>
            <div className='mt-8'>
                <h4 className='font-medium text-gray-300 mb-4'>LOCATION</h4>
                <Input placeholder="City, state, zip code or country"/>
            </div>
            <div className='mt-6'>
                <RadioInput id="london" value="" label="London" />
                <RadioInput id="amsterdam" value="" label="Amsterdam" />
                <RadioInput id="new-york" value="" label="New York" />
                <RadioInput id="Berlin" value="" label="berlin" />
            </div>
        </aside>
        <main className='flex-1 ml-80 pl-5'>
            <div>
                <div className='bg-white flex justify-between items-baseline p-4 rounded-md shadow-lg'>
                    <div className='flex'>
                        <div className='h-[90px] w-[90px]'>
                            <img className='w-full h-full object-contain' src={Logo} alt="" />
                        </div>
                        <div>
                            <small>Company Name</small>
                            <h2>Job Title</h2>
                            <p>Full time</p>
                        </div>
                    </div>
                    <div className='flex'>
                        <p>location</p>
                        <p>time</p>
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}

export default ListingResults