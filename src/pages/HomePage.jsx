import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchRestaurants } from '../connect/state/restaurant/actions'
import HomeCarousel from '../components/home/HomeCarousel'
import MenuCarousel from '../components/home/MenuCarousel'
import Testimonial from '../components/home/Testimonial'
import Message from '../components/home/Message'
import AboutUs from '../components/home/AboutUs'


const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { restaurants, loading } = useSelector(state => state.restaurant)
  
  useEffect(() => {
    dispatch(fetchRestaurants())
  }, [dispatch])
  
  // Get the first restaurant
  const firstRestaurant = restaurants && restaurants.length > 0 ? restaurants[0] : null
  const isRestaurantOpen = firstRestaurant?.open === true

  const handleRestaurantRoute = () => {
    navigate(`/restaurant/${firstRestaurant._id}`)
  }

  return (
    <>
     <div className='dark:bg-black'>
      

      <div className="mt-10 sm:hidden">
        <HomeCarousel />
      </div>

      {/* Hero Section */}
      <div id="home" className="hidden sm:block">
        <div className="mt-10 h-screen w-full relative overflow-hidden">
          {/* Background image with filter to dim it */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D')`,
              filter: 'brightness(0.15)'
            }}
          ></div>
          
          {/* Status chip in top-right corner */}
          {firstRestaurant && (
            <div className="absolute top-14 right-10 z-20">
              <span className={`px-3 py-1 rounded-full text-2xl font-medium ${
                isRestaurantOpen 
                  ? 'bg-orange-300 text-gray-700' 
                  : 'bg-red-500 text-gray-800'
              }`}>
                {isRestaurantOpen ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
          )}
          
          {/* Content with full opacity */}
          <div className="relative flex flex-col items-center justify-center h-full z-10">
            <h1 className="text-4xl font-bold text-white">Delicious Meals, Delivered Fast!</h1>
            <p className="text-white">Order from your favorite restaurants with just a few taps.</p>
            
            {/* Conditional button - only show if restaurant is open */}
            {isRestaurantOpen && firstRestaurant && (
              <button 
                className="mt-6 px-8 py-3 bg-orange-300 text-gray-800 font-semibold rounded-full hover:bg-orange-400 transition-colors duration-200 text-xl bg-gradient-to-r from-orange-500 to-orange-300"
                onClick={handleRestaurantRoute}
              >
                Order Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div id="menu" className="pb-10">
        <MenuCarousel />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="dark:bg-black">
        <Testimonial handleRestaurantRoute={handleRestaurantRoute}/>
      </div>

      {/* About Section */}
      <div id="about">
        <AboutUs />
      </div>

      {/* Contact Section */}
      <div id="contact">
        <Message />
      </div>

      
     </div>
    </>
  )
}

export default HomePage