import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserDashboard from '../pages/UserDashboard'


const UserRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<UserDashboard />} />
    </Routes>
  )
}

export default UserRouter