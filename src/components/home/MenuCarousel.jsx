import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MenuCarousel = () => {
  const snacks = [
    {
      name: 'Meat Pie',
      image: 'https://i.pinimg.com/736x/14/58/2d/14582d054b83150ebc19e36101d088b0.jpg'
    },
    {
      name: 'Sausage Rolls',
      image: 'https://i.pinimg.com/736x/fc/49/61/fc496199e18fa2468399cf379dbba82a.jpg'
    },
    {
      name: 'Fish Rolls',
      image: 'https://i.pinimg.com/736x/cc/a6/f5/cca6f56f5fab600d06d612bd97e01de7.jpg'
    },
    {
      name: 'Hot Dog',
      image: 'https://i.pinimg.com/736x/8a/34/0d/8a340d7b32880e3fa5d31a1d50e2c3af.jpg'
    },
    {
      name: 'Chicken Pie',
      image: 'https://i.pinimg.com/736x/47/c5/ea/47c5ea17c716e06d2e600dc219621b5a.jpg'
    },
    {
      name: 'Puff puff',
      image: 'https://i.pinimg.com/736x/47/a8/d0/47a8d059322c3c9c6ceb52d378415342.jpg'
    },
    {
      name: 'Chocolate Doughnut',
      image: 'https://i.pinimg.com/736x/c6/ae/8a/c6ae8a01e5bc94edaef28586abdc7b4f.jpg'
    },
    {
      name: 'Milky Doughnut',
      image: 'https://i.pinimg.com/736x/bb/ee/d0/bbeed0aea44673cb212329e4157d3abd.jpg'
    },
    {
      name: 'Spring rolls',
      image: 'https://i.pinimg.com/736x/ef/5b/a3/ef5ba3771e3617f0b5ec3c5ba81c290e.jpg'
    },
    {
      name: 'Shawarma',
      image: 'https://i.pinimg.com/736x/cb/0a/44/cb0a441493d225c16439f2dd8794a0c8.jpg'
    },
    {
      name: 'Chicken',
      image: 'https://i.pinimg.com/736x/9e/8f/74/9e8f7475ac214d7f1e1863c99eeeb307.jpg'
    }
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  }

  return (
    <div className="px-4 py-20">
      <h2 data-aos="fade-up" data-aos-duration="2000" data-aos-delay="100" className="font-bold text-center text-gray-800 dark:text-white my-8 pb-12 text-4xl">
        Menu Items
      </h2>
      
      <div data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="200" className="shadow-lg px-12 dark:border-orange-300 dark:border-[1px] dark:border-x-0">
      <Slider {...settings}>
        {snacks.map((snack, index) => (
          <div key={index} className="px-2 py-4 pb-14" data-aos="fade-up" data-aos-duration="1000" data-aos-delay={(index + 1) * 120}>
            <div className="flex flex-col items-center ">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg mb-3 hover:shadow-xl transition-shadow duration-300">
                <img
                  src={snack.image}
                  alt={snack.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm md:text-base font-medium text-center text-gray-700 dark:text-gray-300">
                {snack.name}
              </h3>
            </div>
          </div>
        ))}
      </Slider>
      </div>
    </div>
  )
}

export default MenuCarousel