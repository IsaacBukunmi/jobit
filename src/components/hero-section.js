import React, { useEffect } from 'react'
import { OutlineButton, PrimaryButton } from './button'
import HeroImg from '../assets/images/hero.svg'
import { useNavigate } from 'react-router-dom'
import { routes } from '../utils/routes'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../redux/user/userSlice'

const HeroSection = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading } = useSelector((state) => state.auth)

    const handleDemoApp = () => {
        dispatch(loginUser({email:"doe@test.com", password:"password"}))
    }

    useEffect(() => {
        if (user){
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }, [user, navigate])

    return (
        <div className='pt-8 pb-8  md:flex md:gap-x-10 md:items-center'>
            <div className='basis-1/2 md:mb-0 mb-10'>
                <div className='text-white'>
                    <h1 className='text-5xl font-extrabold mb-6'>Job <span className='text-primary-color'>Management</span> App</h1>
                    <p className='mb-10 leading-7'>Conveniently manage and track all your job applications in one place with monthly application analytics to check how well you are applying. You can also access a wide range of job listings from reliable sources. As a registered user, We give you the ability to add job application to your dashbord with just a click. Sign up today to level up your career. <span onClick={() => handleDemoApp()} className='text-primary-color cursor-pointer underline'>{ isLoading ? "fetching user..." : "Demo app"}</span> and see how it works </p>  
                </div>
                <div className='flex gap-x-8'>
                    <PrimaryButton className="w-48" onClick={() => navigate(routes.LISTINGS)}>Job Listings</PrimaryButton>
                    <OutlineButton className="w-48" onClick={() => navigate(routes.REGISTER)}>Sign Up</OutlineButton>
                </div>
            </div>
            <div className='h-full basis-[45%] w-full'>
                <img className="h-full object-contain" src={HeroImg} alt="hero image" />
            </div>
        </div>
    )
}

export default HeroSection