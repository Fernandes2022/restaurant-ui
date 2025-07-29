import React from 'react'
import { Route, Routes } from 'react-router-dom'


const RestaurantRoute = () => {
  return (
    <Routes>
        <Route path='/restaurant/:id/dashboard*' element={<div>Restaurant Page - Coming Soon</div>} />
    </Routes>
  )
}

export default RestaurantRoute