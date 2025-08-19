import React from 'react'

const Footer = () => {
  return (
    <footer className="border-orange-300 text-center border-t-[0.5px] text-gray-700 dark:text-white pt-4 pb-4 bg-white dark:bg-black" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          Copyright &copy; 2024. All rights reserved
        </p>
        <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
          Designed by Timi-tech (X: @Timi_tech_)
        </p>
      </div>
    </footer>
  )
}

export default Footer