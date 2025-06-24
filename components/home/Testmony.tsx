"use client";

import { Quote, Star, User, GraduationCap, Heart } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Adunni Olatunji",
    role: "Mother of 2",
    location: "Lagos, Nigeria",
    text: "Finding a home tutor for my children has never been easier. The tutors are professional, and my kids' grades have improved tremendously. AMI Education truly understands the African educational landscape.",
    rating: 5,
    subject: "Mathematics & English",
  },
  {
    name: "Kwame Asante",
    role: "Professional Tutor",
    location: "Accra, Ghana",
    text: "This platform has transformed my tutoring career. I can easily connect with students in my area, and the payment system is seamless. The support team is always helpful.",
    rating: 5,
    subject: "Physics & Chemistry",
  },
  {
    name: "Fatima Abdullahi",
    role: "Parent & Educator",
    location: "Abuja, Nigeria",
    text: "As both a parent and educator, I appreciate the hybrid learning approach. My daughter gets personalized attention, and I can track her progress easily through the platform.",
    rating: 5,
    subject: "Biology & Literature",
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {" "}
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Heart className="w-4 h-4" />
            Success Stories
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            What Our Community
            <span className="block text-blue-600">Says About Us</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Real feedback from parents and tutors who have experienced the
            transformation that quality education brings.
          </motion.p>
        </motion.div>{" "}
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Background decoration */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full transform translate-x-10 -translate-y-10"
                whileHover={{ scale: 1.5 }}
                transition={{ duration: 0.5 }}
              ></motion.div>
              {/* Quote icon */}
              <motion.div
                className="relative mb-6"
                initial={{ rotate: -10, scale: 0 }}
                whileInView={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Quote className="text-blue-500 w-10 h-10 opacity-80" />
              </motion.div>
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ rotate: 0, scale: 0 }}
                    whileInView={{ rotate: 360, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>{" "}
              {/* Testimonial text */}
              <p className="text-gray-700 mb-6 italic leading-relaxed relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              {/* Subject badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                <GraduationCap className="w-3 h-3" />
                {testimonial.subject}
              </div>{" "}
              {/* Author info */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>{" "}
        {/* Bottom stats */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: "4.9/5",
                label: "Average Rating",
                color: "text-blue-600",
                showStars: true,
              },
              {
                value: "2,500+",
                label: "Happy Families",
                color: "text-green-600",
              },
              {
                value: "500+",
                label: "Verified Tutors",
                color: "text-purple-600",
              },
              { value: "98%", label: "Success Rate", color: "text-orange-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`text-3xl font-bold ${stat.color} mb-2`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                {stat.showStars && (
                  <div className="flex justify-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ rotate: 0, scale: 0 }}
                        whileInView={{ rotate: 360, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
