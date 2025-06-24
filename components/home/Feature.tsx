"use client";

import { CheckCircle, Users, GraduationCap, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";

const KeyFeatures = () => {
  const features = [
    {
      category: "For Parents",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      items: [
        "Find Verified Tutors: Easily discover qualified home lesson teachers.",
        "Location-Based Matching: Get connected with tutors near you.",
        "Flexible Scheduling: Arrange lessons based on your child's availability.",
        "Direct Communication: Contact teachers to discuss learning needs.",
      ],
    },
    {
      category: "For Teachers",
      icon: <GraduationCap className="w-8 h-8 text-green-600" />,
      color: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      items: [
        "Join as a Home Tutor: Apply to be matched with students in your area.",
        "GPS-Based Matching: Get paired with parents based on your location.",
        "Flexible Work Hours: Set your availability and preferred teaching times.",
        "Profile & Reviews: Build credibility with ratings from parents.",
      ],
    },
    {
      category: "Platform Benefits",
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      color: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      items: [
        "Offline-First Approach: No online classes—only physical home lessons.",
        "Secure & Verified: Ensuring safe and reliable teacher-parent connections.",
        "Easy Onboarding: Quick registration process for both parents and tutors.",
        "Support & Guidance: Resources to help tutors deliver quality education.",
      ],
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4" />
            Key Features & Benefits
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Everything You Need for
            <span className="block text-blue-600">Educational Success</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover how our comprehensive platform supports both parents and
            teachers in creating exceptional learning experiences.
          </motion.p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`group relative bg-gradient-to-br ${feature.color} p-8 rounded-2xl border-2 ${feature.borderColor} hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Background decoration */}
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 opacity-10 transform translate-x-8 -translate-y-8"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {feature.icon}
              </motion.div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="p-3 bg-white rounded-xl shadow-sm"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {feature.category}
                </h3>
              </div>

              {/* Features list */}
              <ul className="space-y-4">
                {feature.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start space-x-3 transition-transform duration-300"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    whileHover={{ x: 10 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1 + idx * 0.05,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.7 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {[
              {
                number: "2,500+",
                label: "Happy Students",
                color: "text-blue-600",
              },
              {
                number: "500+",
                label: "Expert Tutors",
                color: "text-green-600",
              },
              {
                number: "98%",
                label: "Success Rate",
                color: "text-purple-600",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`text-3xl font-bold ${stat.color} mb-2`}
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                {index < 2 && (
                  <div className="w-px h-12 bg-gray-200 absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeatures;
