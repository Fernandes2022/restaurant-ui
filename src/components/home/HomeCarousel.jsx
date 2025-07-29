import Slider from 'react-slick'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchRestaurants } from '../../connect/state/restaurant/actions'

const heroCarousel = [
 {
  title: 'Delicious Snacks Await',
  subtitle: 'Discover amazing flavors and fresh ingredients',
  img: 'https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudHN8ZW58MHx8MHx8fDA%3D'
 },
 {
  title: 'Fresh & Tasty Bites',
  subtitle: 'Made with love and premium ingredients',
  img: 'https://images.unsplash.com/photo-1474898856510-884a2c0be546?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D'
 },
 {
  title: 'Cozy Restaurant Vibes',
  subtitle: 'Perfect atmosphere for every occasion',
  img: 'https://images.unsplash.com/photo-1695838709523-47f265d3f6b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG91dHNpZGUlMjBvZiUyMHRoZSUyMHJlc3RhdXJhbnRzfGVufDB8fDB8fHww'
 },
]
const HomeCarousel = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

 const settings = {
  
  dots: true,
  arrows: false,
  infinite: true,
  speed: 700,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
  pauseOnHover: true,
  pauseOnFocus: true,
  responsive: [
   {
    breakpoint: 10000,
    settings: {
     slidesToShow: 3,
     slidesToScroll: 1,
     infinite: true,
    }
   }, {
    breakpoint: 1024,
    settings: {
     slidesToShow: 2,
     slidesToScroll: 1,
     initialSlide: 2,
    }
   }, {
    breakpoint: 640,
    settings: {
     slidesToShow: 1,
     slidesToScroll: 1,
    }
   }
  ]
 }
  return (
    <>
    <div  className='shadow-2xs sm:hidden'>
     <Slider {...settings}>
      {heroCarousel.map((items) => (
       <div className="mt-10 h-screen w-full relative overflow-hidden">
       {/* Background image with filter to dim it */}
       <div 
         className="absolute inset-0 bg-cover bg-center"
         style={{
           backgroundImage: `url(${items.img})`,
           filter: 'brightness(0.15)'
         }}
       ></div>

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
         <h1 className="text-4xl font-bold text-white">{items.title}</h1>
         <p className="text-white">{items.subtitle}</p>

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
      ))}
     </Slider>
    </div>

    <div className="hidden sm:block">
     <div className=''>
      {heroCarousel.map((items) => 
      <div>
       {items.title === 'Delicious Snacks Await' ? (
       <div className='relative '>
        <img src={items.img} alt=""  className='md:h-screen md:w-screen'/>
        <div className="absolute z-30 top-[27%] left-[16%] md:left-[35%] ">
         <h1 className='text-4xl font-bold bg-gradient-to-r from-green-200 to-red-500 bg-clip-text text-transparent'>
          {items.title}
         </h1>
         <h2 className='text-2xl text-center font-semibold text-gray-200'>
          {items.subtitle}
         </h2>
        </div>

        <div className="absolute top-[65%] md:top-[50%] left-[35%]">
         <a href="/RegisterPage" className='bg-gradient-to-r from-green-400 to-red-700 p-2 text-white rounded-md shadow-2xs'>
         Get Started
         </a>
        </div>
       </div>
      ) : (
       <div></div>
      )}
      </div>
      )}
     </div>
    </div>
    </>
  )
}

export default HomeCarousel