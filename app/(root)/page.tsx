"use client";
import ActionSection from "@/components/home/ActionSection";
import KeyFeatures from "@/components/home/Feature";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroPage";
import HowItWorks from "@/components/home/HowItWorks";
import LessionSection from "@/components/home/LessionSection";
import Newsletter from "@/components/home/Newsletter";
import TestimonialSection from "@/components/home/Testmony";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: false, // Whether animation should happen only once
    });
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <KeyFeatures />
      <HowItWorks />
      <LessionSection />
      <ActionSection />
      <Newsletter />
      <TestimonialSection />
      <Footer />
    </div>
  );
}
