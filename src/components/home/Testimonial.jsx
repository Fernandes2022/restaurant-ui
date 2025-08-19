import React from 'react'

const Testimonial = ({handleRestaurantRoute}) => {
  const testimonials = [
    {
      id: 1,
      name: "Olayemi",
      role: "Food Blogger",
      image: "https://images.unsplash.com/photo-1654125992221-8d1f49436357?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJsYWNrJTIwbWVuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D?w=150&h=150&fit=crop&crop=face",
      quote: "The meat pie here is absolutely divine! Flaky, buttery crust with perfectly seasoned beef filling. It's my go-to snack whenever I'm in the area. The chicken pie is equally amazing - so juicy and flavorful!",
      rating: 5
    },
    {
      id: 2,
      name: "Adebayo",
      role: "Local Business Owner",
      image: "https://images.unsplash.com/photo-1612213993024-b0ed04dfb248?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsYWNrJTIwbWVuJTIwcG9ydHJhaXR8ZW58MHx8MHx8fDA%3D?w=150&h=150&fit=crop&crop=face",
      quote: "I'm obsessed with their sausage rolls! Perfectly golden pastry with juicy, well-seasoned sausage inside. My kids love the fish rolls too - they're always asking me to bring some home. The quality is consistently excellent!",
      rating: 5
    },
    {
      id: 3,
      name: "David",
      role: "Chef & Food Critic",
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsYWNrJTIwbWVufGVufDB8fDB8fHww?w=150&h=150&fit=crop&crop=face",
      quote: "The attention to detail in their pastries is remarkable. The hot dogs are perfectly grilled with the most delicious toppings. But their doughnuts are the real star - fluffy, sweet, and absolutely addictive!",
      rating: 5
    },
    {
      id: 4,
      name: "Ibraheem",
      role: "Teacher",
      image: "https://images.unsplash.com/photo-1634727898501-a76b30bc2c9a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsYWNrJTIwbWVufGVufDB8fDB8fHww?w=150&h=150&fit=crop&crop=face",
      quote: "This place is my study break heaven! The shawarma is packed with fresh ingredients and the perfect amount of sauce. The meat pie is my comfort food - warm, flaky, and so satisfying. Perfect for a quick lunch!",
      rating: 5
    },
    {
      id: 5,
      name: "Mr Michael",
      role: "Banker",
      image: "https://images.unsplash.com/photo-1675383094481-3e2088da943b?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGJsYWNrJTIwbWVufGVufDB8fDB8fHww?w=150&h=150&fit=crop&crop=face",
      quote: "I grab lunch here almost every day! The chicken pie is my favorite - the filling is always moist and the crust is perfectly golden. Their sausage rolls are also fantastic. Great value for money!",
      rating: 5
    },
    {
      id: 6,
      name: "Tope",
      role: "Student",
      image: "https://plus.unsplash.com/premium_photo-1661575214872-3d87e1dee4f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJsYWNrJTIwd29tZW58ZW58MHx8MHx8fDA%3D?w=150&h=150&fit=crop&crop=face",
      quote: "Even though I'm health-conscious, I can't resist their doughnuts! They're the perfect treat after a workout. The fish rolls are also a great protein-packed snack. Everything is made fresh daily!",
      rating: 5
    }
  ]

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <svg key={index} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-12 dark:bg-black dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 dark:bg-black dark:text-white">
        
        <div data-aos="flip-down" data-aos-duration="1000" data-aos-delay="100" className="text-center mb-16 dark:text-white">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            What Our Customers Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto dark:text-gray-300">
            Discover why our neighbors and food lovers keep coming back for our authentic flavors and warm hospitality
          </p>
        </div>

        
        <div data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="200" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl dark:bg-black dark:text-white dark:border-orange-300 dark:border-[1px]"
              data-aos="fade-up" data-aos-duration="1000" data-aos-delay={(idx + 1) * 150}
            >
              
              <div className="flex mb-6">
                {renderStars(testimonial.rating)}
              </div>

              
              <blockquote className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>

              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-amber-200"
                />
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {testimonial.name}
                  </h4>
                  <p className="text-amber-600 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-16 ">
          <div data-aos="fade-down" data-aos-duration="1000" data-aos-delay="100" className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto dark:bg-black dark:text-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-white">
              Join Our Growing Family
            </h3>
            <p className="text-gray-600 mb-6 dark:text-gray-300">
              Experience the authentic flavors that our community loves. Come taste the difference that tradition and passion make.
            </p>
            <button onClick={handleRestaurantRoute} className="bg-gradient-to-r from-orange-500 to-orange-300 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
              Visit Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial