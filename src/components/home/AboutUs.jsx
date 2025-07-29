import React from 'react'
import { 
  Bolt, 
  Visibility, 
  Home, 
  Favorite, 
  People, 
  FlashOn, 
  Person 
} from '@mui/icons-material'

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-black">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            About Our Restaurant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're passionate about bringing you the finest dining experience with fresh ingredients, 
            innovative recipes, and exceptional service that makes every meal memorable.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-6">
              <Bolt className="w-8 h-8 text-gray-800" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To provide exceptional culinary experiences that delight our customers with every bite, 
              using locally sourced ingredients and innovative cooking techniques.
            </p>
          </div>

          <div className="bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 p-8 rounded-lg shadow-lg">
            <div className="w-16 h-16 bg-orange-300 rounded-full flex items-center justify-center mb-6">
              <Visibility className="w-8 h-8 text-gray-800" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To become the most beloved restaurant in our community, known for outstanding snacks, 
              warm hospitality, and creating lasting memories for our guests.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 rounded-lg shadow-lg p-8 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Founded in 2015, our restaurant began as a small family dream to share our passion 
                for authentic cuisine with the community. What started as a humble kitchen has grown 
                into a beloved dining destination.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our Bakers bring years of experience from renowned culinary institutions, combining 
                traditional techniques with modern innovation to make snacks that are both familiar 
                and exciting.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, we continue to honor our roots while embracing new flavors and techniques, 
                always striving to exceed our guests' expectations with every visit.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-orange-300 to-orange-500 rounded-lg flex items-center justify-center">
                <Home className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Favorite className="w-10 h-10 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Quality</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We never compromise on quality, using only the finest ingredients and maintaining 
                the highest standards in everything we do.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <People className="w-10 h-10 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Community</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We're proud to be part of our local community, supporting local farmers and 
                creating a welcoming space for everyone.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <FlashOn className="w-10 h-10 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We constantly explore new flavors and techniques, pushing culinary boundaries 
                while respecting traditional methods.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Person className="w-16 h-16 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Mr. Ifeoluwa</h3>
              <p className="text-orange-500 font-semibold mb-2">Product Manager</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                With over 10 years of culinary experience, Mr. IfeOluwa brings creativity and 
                passion to every snacks been produced.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Person className="w-16 h-16 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Mrs Jessica</h3>
              <p className="text-orange-500 font-semibold mb-2">Sale's Manager</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Mrs Jessica's expertise in marketing has helped this company grow.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-orange-300 rounded-full flex items-center justify-center mx-auto mb-4">
                <Person className="w-16 h-16 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Mrs Ogundepo</h3>
              <p className="text-orange-500 font-semibold mb-2">General Manager</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                The General ensures every guest receives exceptional service and has a memorable 
                dining experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUs