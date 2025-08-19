import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import UserDashboard from './pages/UserDashboard'
import NavBar from './components/navBar/navBar'
import Footer from './components/footer/Footer'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Cart from './components/cart/Cart'
import RestaurantRoute from './routers/RestaurantRoute'
import RestaurantPage from './pages/RestaurantPage'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'



const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 500,
      easing: 'ease-in-sine',
      delay: 100,
    });
    AOS.refresh();
  },)

  // Always scroll to top when the route (pathname) changes
  const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }, [pathname])
    return null
  }
  return (
      <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/user/:id/dashboard*' element={<UserDashboard />} />
        <Route path='/restaurant/:id' element={<RestaurantPage />} />
        <Route path='/restaurant/:id/dashboard*' element={<RestaurantRoute />} />
        <Route path='*' element={<div>404 - Page Not Found</div>} />
      </Routes>
      <Footer />
      </>
  )
}

export default App