import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthWrapper from '../components/auth-wrapper'
import { PrimaryButton } from '../components/button'
import { Input } from '../components/input'
import Layout from '../components/layout'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../redux/user/userSlice'
import { useEffect } from 'react'
import { routes } from '../utils/routes'

const initialState = {
    name: '',
    email: '',
    password: '',
  };

const Register = () => {

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
        const {name, email, password } = values
        if(!name || !email || !password ){
            toast.error("fill out all details")
            return
        }
        dispatch(registerUser({name, email, password}))
    }

    useEffect(() => {
        if (user){
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [user, navigate])

  return (
    <Layout>
        <div className='flex flex-col items-center justify-center h-[90vh] '>
            <AuthWrapper title="Register" subTitle="Hey, Enter your details to register on our platform">
                <form onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <Input label="Name" type="text" placeholder="John Doe" name="name" handleChange={handleChange}/>
                    </div>
                    <div className='mb-5'>
                        <Input label="Email" type="email" placeholder="johndoe@test.com" name="email" handleChange={handleChange}/>
                    </div>
                <div className='mb-5'>
                        <Input label="Password" type="password" placeholder="****" name="password" handleChange={handleChange}/>
                </div>
                <PrimaryButton className="w-full mt-7" loading={isLoading}>Sign Up</PrimaryButton>
                <p className='text-center mt-2'>Have an account already? <span className="text-primary-color font-medium"><Link to={routes.LOGIN}>Login</Link></span></p>
                </form>
            </AuthWrapper>
        </div>
    </Layout>
  )
}

export default Register