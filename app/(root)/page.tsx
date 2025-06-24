"use client";
import ActionSection from "@/components/home/ActionSection";
import KeyFeatures from "@/components/home/Feature";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroPage";
import HowItWorks from "@/components/home/HowItWorks";
import LessionSection from "@/components/home/LessionSection";
import Newsletter from "@/components/home/Newsletter";
import TestimonialSection from "@/components/home/Testmony";
import Navbar from "@/components/home/Navbar";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      {/* Hero Section with enhanced spacing */}
      <motion.div
        className="relative overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <HeroSection />
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          ></motion.div>
          <motion.div
            className="absolute top-40 right-20 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          ></motion.div>
        </div>
      </motion.div>

      {/* Main content sections with improved spacing */}
      <motion.div
        className="space-y-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <KeyFeatures />
        <HowItWorks />
        <LessionSection />
        <ActionSection />
        <div className="py-16">
          <TestimonialSection />
        </div>
        <div className="py-8">
          <Newsletter />
        </div>
      </motion.div>

      <Footer />
    </motion.div>
  );
}
