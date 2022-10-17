import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { PrimaryButton } from '../../components/button'
import { Input } from '../../components/input'
import { updateUser } from '../../redux/user/userSlice'

const Profile = () => {

    const {isLoading, user} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [userData, setUserData] = useState({
        name: user?.name || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        location: user?.location || '',
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setUserData({...userData, [name]:value})
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const {name, lastName, email, location} = userData
        if(!user || !lastName || !email || !location){
            toast.error("Fill out all details")
            return;
        }
        console.log("click")
        dispatch(updateUser({name, lastName, email, location}))
    }

    return (
        <div>
            <div className='flex items-center gap-8 mb-8'>
                <div className='w-28 h-28 rounded-full bg-primary-color text-white font-extrabold text-[60px] flex items-center justify-center'>
                   {`${user?.name[0]} ${user?.lastName[0]}`}
                </div>
                <div className='text-white'>
                    <p>{`${user?.name} ${user?.lastName}`}</p>
                    <p><em>{user?.email}</em></p>
                </div>
            </div>
            <form className='md:grid md:grid-cols-2 md:gap-8'>
                <Input label="First Name" type="text" placeholder="John" name="name" className="mt-2" labelStyle="text-white" value={userData?.name} handleChange={handleChange}  />
                <Input label="Last Name" type="text" placeholder="Doe" name="lastName" className="mt-2" labelStyle="text-white" value={userData?.lastName} handleChange={handleChange}/>
                <Input label="Email" type="email" placeholder="johndoe@test.com" name="email" className="mt-2" labelStyle="text-white" value={userData?.email} handleChange={handleChange}/>
                <Input label="Location" type="text" placeholder="New York" name="location" className="mt-2" labelStyle="text-white" value={userData?.location} handleChange={handleChange}/>
            </form>
            <div className='flex justify-end'>
                <PrimaryButton className="w-44 mt-7" loading={isLoading} onClick={handleSubmit}>Update Profile</PrimaryButton>
            </div>
        </div>
    )
}

export default Profile