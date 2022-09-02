import React from 'react'
import { PrimaryButton } from './button'
import { Input } from './input'


const ListingSearch = () => {

    const handleSearch = () => {

    }

    return (
        <div>
            <div className="bg-search-bg h-44 mt-10">
                <div className='flex gap-8 justify-center items-center h-full'>
                    <Input  className='w-[50vw]' type="search" placeholder="Title, company, expertise" name="search" handleChange={handleSearch}/>
                    <PrimaryButton  className=' w-40'>Search</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default ListingSearch