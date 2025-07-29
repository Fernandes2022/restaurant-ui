import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import NavBar from '../components/navBar/navBar'
import Footer from '../components/footer/Footer'

const HomeRoute = () => {
  return (
   <>
   <NavBar />
   <Routes>
   <Route path='/' element={<HomePage />} />
   <Route path='/about' element={<AboutPage />} />
   <Route path='*' element={<div>404 - Page Not Found</div>} />
   </Routes>
   <Footer />
   </>
  )
}

export default HomeRoute