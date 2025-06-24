"use client";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed w-full z-50">
      <nav
        className={` shadow-md py-4 md:py-6 px-6 w-full z-50 ${
          isScrolled
            ? " bg-[#002D69] text-red-50 "
            : " bg-red-50 text-[#002D69] "
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="">
              <span className="text-xl font-bold ">AMI Education</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className=" hover:text-blue-600 font-medium">
              Find a tutor
            </Link>
            <Link href="/" className=" hover:text-blue-600 font-medium">
              How it works
            </Link>
            <Link href="/" className=" hover:text-blue-600 font-medium">
              Prices
            </Link>
            <Link href="#" className=" hover:text-blue-600 font-medium">
              Become a tutor
            </Link>
            <Link href="#" className=" hover:text-blue-600 font-medium">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Sign In
              </Button>
            </Link>
            <Button className="md:hidden " onClick={() => setIsNavOpen(true)}>
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 bg-opacity-25 z-50 transition-opacity duration-300 ${
          isNavOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold text-blue-600">Menu</span>
              <Button onClick={() => setIsNavOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            <div className="flex flex-col space-y-6">
              <Link
                href="/"
                className="text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setIsNavOpen(false)}
              >
                Find a tutor
              </Link>
              <Link
                href="/"
                className="text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setIsNavOpen(false)}
              >
                How it works
              </Link>
              <Link
                href="/"
                className="text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setIsNavOpen(false)}
              >
                Prices
              </Link>
              <Link
                href="#"
                className="text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setIsNavOpen(false)}
              >
                Become a tutor
              </Link>
              <Link
                href="#"
                className="text-gray-800 hover:text-blue-600 font-medium"
                onClick={() => setIsNavOpen(false)}
              >
                Contact
              </Link>
              <Link href="login" onClick={() => setIsNavOpen(false)}>
                <Button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                  onClick={() => setIsNavOpen(false)}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
