import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthWrapper from '../components/auth-wrapper'
import { PrimaryButton } from '../components/button'
import { Input } from '../components/input'
import Layout from '../components/layout'
import { toast } from 'react-toastify';
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../redux/user/userSlice'
import { routes } from '../utils/routes'

const initialState = {
    email: '',
    password: '',
  };

const Login = () => {

    const navigate = useNavigate()
    const {isLoading, user} = useSelector(state =>  state.auth)

    const [values, setValues] = useState(initialState)

    const dispatch = useDispatch()

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setValues({...values, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const {email, password } = values
        if(!email || !password ){
            toast.error("fill out all details")
            return;
        }
        dispatch(loginUser({email, password}))      
    }

    useEffect(() => {
        if (user){
            setTimeout(() => {
                navigate('/')
            }, 1000)
        }
    }, [user, navigate])

  return (
    <Layout>
        <div className='flex flex-col items-center justify-center h-[90vh] '>
            <AuthWrapper title="Login" subTitle="Welcome back, Enter your details to login">
                <form onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <Input label="Email" type="email" placeholder="johndoe@test.com" name="email" handleChange={handleChange}/>
                    </div>
                <div className='mb-5'>
                        <Input label="Password" type="password" placeholder="****" name="password" handleChange={handleChange}/>
                </div>
                <PrimaryButton className="w-full mt-7" loading={isLoading}>Sign In</PrimaryButton>
                </form>
                <p className='text-center mt-2'>Don't have an account? <span className="text-primary-color font-medium"><Link to={routes.REGISTER}>Register</Link></span></p>
            </AuthWrapper>
        </div>
    </Layout>
  )
}


export default Login