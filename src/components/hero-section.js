import React from 'react'
import { OutlineButton, PrimaryButton } from './button'
import HeroImg from '../assets/images/hero.svg'
import { useNavigate } from 'react-router-dom'
import { routes } from '../utils/routes'

const HeroSection = () => {

    const navigate = useNavigate()

    return (
        <div className='pt-8 pb-8 md:flex md:gap-x-10 md:items-center'>
            <div className='basis-1/2'>
                <div className='text-white'>
                    <h1 className='text-5xl font-extrabold mb-6'>Job <span className='text-primary-color'>Management</span> App</h1>
                    <p className='mb-10 leading-7'>Fixie palo santo meggings tumblr semiotics. Literally street art air plant squid, VHS cornhole sus bicycle rights kickstarter sartorial affogato. Mukbang hoodie next level la croix man braid poke. Taxidermy jean shorts mixtape ramps chicharrones photo booth cronut distillery.</p>  
                </div>
                <div className='flex gap-x-8'>
                    <PrimaryButton className="w-48" onClick={() => navigate(routes.LISTINGS)}>Job Listings</PrimaryButton>
                    <OutlineButton className="w-48" onClick={() => navigate(routes.REGISTER)}>Sign Up</OutlineButton>
                </div>
            </div>
            <div className='h-full basis-1/2 w-full'>
                <img className="h-full object-contain" src={HeroImg} alt="hero image" />
            </div>
        </div>
    )
}

export default HeroSection