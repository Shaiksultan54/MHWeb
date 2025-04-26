import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Amira Patel',
    role: 'Bridal Mehndi Artist',
    image: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg',
    quote: 'The Bridal Mehndi Masterclass transformed my skills and helped me launch my own business. The techniques are explained so clearly that even complex patterns become achievable.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Hobbyist',
    image: 'https://images.pexels.com/photos/1758845/pexels-photo-1758845.jpeg',
    quote: 'As someone with no prior experience, the Beginner\'s Guide was perfect. Now I can create beautiful designs for family gatherings and feel confident in my skills.'
  },
  {
    id: 3,
    name: 'Raj Sharma',
    role: 'Event Designer',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    quote: 'The Indo-Western Fusion course gave me unique ideas to incorporate into my event designs. My clients love the contemporary twist on traditional patterns.'
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-burgundy-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Students Say</h2>
          <p className="text-burgundy-200 max-w-2xl mx-auto">
            Join thousands of satisfied learners who have mastered the art of Mehndi through our expert-led courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div 
              key={testimonial.id} 
              className="bg-burgundy-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
                />
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-burgundy-300">{testimonial.role}</p>
                </div>
              </div>
              
              <blockquote className="relative pl-6">
                <span className="absolute top-0 left-0 text-4xl text-amber-400 font-serif">"</span>
                <p className="text-burgundy-100 italic text-sm leading-relaxed">
                  {testimonial.quote}
                </p>
              </blockquote>
              
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="h-5 w-5 text-amber-400 fill-current" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;