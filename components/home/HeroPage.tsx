import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, PlayCircle, Star, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative px-4 pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-32 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
      </div>
      {/* Floating stats cards */}
      <motion.div
        className="absolute top-40 left-8 hidden lg:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 text-white">
            <Users className="w-5 h-5 text-blue-300" />
            <div>
              <div className="text-lg font-bold">2,500+</div>
              <div className="text-xs text-gray-300">Active Students</div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="absolute top-60 right-8 hidden lg:block"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-2 text-white">
            <BookOpen className="w-5 h-5 text-green-300" />
            <div>
              <div className="text-lg font-bold">500+</div>
              <div className="text-xs text-gray-300">Expert Tutors</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex justify-between md:flex-row flex-col items-center gap-12">
          <motion.div
            className="space-y-8 lg:text-left text-center text-gray-50 md:w-[60%] relative z-10"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Trust indicator */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-2 text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ rotate: 0, scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
              <span className="text-gray-300">Trusted by 2,500+ families</span>
            </motion.div>
            <div className="space-y-6">
              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Transform Your Child's
                <span className="block text-blue-300">Education Journey</span>
              </motion.h1>
              <motion.p
                className="mx-auto lg:mx-0 max-w-[600px] text-gray-300 md:text-xl leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Join Africa's premier hybrid learning platform. Our innovative
                60% offline, 40% online model delivers personalized education
                that adapts to your child's unique learning style.
              </motion.p>
            </div>
            {/* CTA Buttons with enhanced styling */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="text-base bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-all duration-200"
                >
                  <Link href="/register/parent">
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-base border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                >
                  <Link href="/register/teacher">Become a Tutor</Link>
                </Button>
              </motion.div>
            </motion.div>
            {/* Feature highlights */}{" "}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-300 pt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {[
                { icon: CheckCircle, text: "Hybrid Learning Model" },
                { icon: CheckCircle, text: "Real-time Progress" },
                { icon: CheckCircle, text: "GPS-Based Matching" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                >
                  <item.icon className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced image section */}
          <motion.div
            className="md:w-[40%] relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Glowing background */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>

              {/* Main image container */}
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/img/student.png"
                  alt="African education illustration"
                  className="object-cover rounded-xl w-full h-auto max-w-sm mx-auto"
                  priority
                  width={400}
                  height={500}
                />
              </motion.div>

              {/* Floating achievement badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-full p-3 shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-xs font-bold text-center">
                  <div>98%</div>
                  <div className="text-[10px]">Success Rate</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
