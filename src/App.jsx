import React from 'react'
import { Routes, Route } from 'react-router-dom'
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



const App = () => {
  React.useEffect(() => {
    AOS.init(
        {
          offset: 100,
          duration: 500,
          easing: "ease-in-sine",
          delay: 100, 
        }
    );
    AOS.refresh();
  },)
  return (
      <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/cart' element={<Cart />} />
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