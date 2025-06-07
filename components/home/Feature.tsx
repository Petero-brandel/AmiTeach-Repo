"use client";

import { CheckCircle } from "lucide-react";

const KeyFeatures = () => {
  const features = [
    {
      category: "For Parents",
      items: [
        "Find Verified Tutors: Easily discover qualified home lesson teachers.",
        "Location-Based Matching: Get connected with tutors near you.",
        "Flexible Scheduling: Arrange lessons based on your child’s availability.",
        "Direct Communication: Contact teachers to discuss learning needs.",
      ],
    },
    {
      category: "For Teachers",
      items: [
        "Join as a Home Tutor: Apply to be matched with students in your area.",
        "GPS-Based Matching: Get paired with parents based on your location.",
        "Flexible Work Hours: Set your availability and preferred teaching times.",
        "Profile & Reviews: Build credibility with ratings from parents.",
      ],
    },
    {
      category: "Platform Benefits",
      items: [
        "Offline-First Approach: No online classes—only physical home lessons.",
        "Secure & Verified: Ensuring safe and reliable teacher-parent connections.",
        "Easy Onboarding: Quick registration process for both parents and tutors.",
        "Support & Guidance: Resources to help tutors deliver quality education.",
      ],
    },
  ];

  return (
    <section className="py-12 px-6 md:px-12  bg-gray-100">
      <div className=" mx-auto">
        <h2 data-aos="zoom-in" className="text-3xl font-bold text-center text-gray-800 mb-8">
          ✅ Key Features & Benefits
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div data-aos="zoom-in" key={index} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {feature.category}
              </h3>
              <ul className="space-y-3 list-decimal ">
                {feature.items.map((item, idx) => (
                  <li key={idx} className="flex  items-start space-x-2">
                    <CheckCircle size={32} className="text-blue-500 " />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
