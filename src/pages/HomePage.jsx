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
     <div className='dark:bg-black'>
      

      <div className="mt-10 sm:hidden">
        <HomeCarousel />
      </div>

      
      <div id="home" className="hidden sm:block">
        <div data-aos="flip-down" data-aos-duration="2000" data-aos-delay="100" className="mt-10 h-screen w-full relative overflow-hidden">
          
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D')`,
              filter: 'brightness(0.15)'
            }}
          ></div>
          
          
          {firstRestaurant && (
            <div className="absolute top-14 right-10 z-20" data-aos="fade-down" data-aos-duration="1000" data-aos-delay="300">
              <span className={`px-3 py-1 rounded-full text-2xl font-medium ${
                isRestaurantOpen 
                  ? 'bg-orange-300 text-gray-700' 
                  : 'bg-red-500 text-gray-800'
              }`}>
                {isRestaurantOpen ? 'OPEN' : 'CLOSED'}
              </span>
            </div>
          )}
          
          
          <div className="relative flex flex-col items-center justify-center h-full z-10">
            <h1 className="text-4xl font-bold text-white" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">Delicious Meals, Delivered Fast!</h1>
            <p className="text-white" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">Order from your favorite restaurant with just a few taps.</p>
            
            
            {isRestaurantOpen && firstRestaurant && (
              <button 
                className="mt-6 px-8 py-3 bg-orange-300 text-gray-800 font-semibold rounded-full hover:bg-orange-400 transition-colors duration-200 text-xl bg-gradient-to-r from-orange-500 to-orange-300"
                onClick={handleRestaurantRoute}
                data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300"
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
  )
}

export default HomePage