"use client";

import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Parent",
    text: "Finding a home tutor for my son has never been easier. The process was seamless, and the tutor was highly professional.",
  },
  {
    name: "John Smith",
    role: "Tutor",
    text: "This platform helped me connect with students in my area. The experience has been amazing!",
  },
  {
    name: "Sarah Johnson",
    role: "Parent",
    text: "My daughter’s grades have improved significantly thanks to the dedicated tutor we found here.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        {/* Section Header */}
        <h2 data-aos="zoom-in" className="text-3xl font-bold text-gray-800">⭐ What Parents & Tutors Say</h2>
        <p data-aos="zoom-in" className="text-gray-600 mt-2 mb-8">Real feedback from our users.</p>

        {/* Testimonials Grid */}
        <div data-aos="fade-up" className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div  key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Quote className="text-blue-500 w-10 h-10 mx-auto mb-3" />
              <p className="text-gray-700 italic">{testimonial.text}</p>
              <h4 className="mt-4 font-semibold text-gray-800">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
