import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({children}) => {
    const {user} = useSelector((state) => state.auth)

    if(!user){
        return <Navigate to="/home" />
    }
    return children
}
export default ProtectedRoute