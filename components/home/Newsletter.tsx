"use client";

//import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="bg-blue-600 w-[95%] rounded-xl mx-auto text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        
        <h2 className="text-3xl font-bold"> Stay Updated!</h2>
        <p className="text-lg mt-2 mb-6">Subscribe to our newsletter and never miss an update.</p>

        {/* Subscription Form */}
        <form className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button type="submit" className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold shadow-2xl">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
