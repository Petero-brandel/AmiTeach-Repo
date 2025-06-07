"use client";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Search,
  GraduationCap,
  BarChart,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="text-white text-3xl" />,
      title: "Registration",
      description:
        "Parents and tutors sign up. They create profiles detailing their skills and preferences.",
    },
    {
      icon: <Search className="text-white text-3xl" />,
      title: "Matching",
      description:
        "Parents search for tutors based on location, subjects, and qualifications to find the best fit.",
    },
    {
      icon: <GraduationCap className="text-white text-3xl" />,
      title: "Classes Begin",
      description:
        "Tutors conduct lessons at the student's home or online, following the agreed schedule.",
    },
    {
      icon: <BarChart className="text-white text-3xl" />,
      title: "Performance",
      description:
        "Parents track student progress through performance reports and tutor feedback.",
    },
    {
      icon: <CheckCircle className="text-white text-3xl" />,
      title: "Improvement",
      description:
        "Students gain confidence, enhance their skills, and achieve better academic results.",
    },
  ];

  return (
    <div>
      <section className="py-16 px-6 md:px-12  bg-gray-50">
        <div className=" mx-auto text-center">
          <h2
            data-aos="zoom-in"
            className="text-4xl font-bold text-gray-800 mb-12"
          >
            🚀 How It Works
          </h2>

          <div className="flex flex-wrap items-center gap-8 md:gap-5 w-[90%] mx-auto">
            {steps.map((step, index) => (
              <div
                data-aos="fade-up"
                key={index}
                className="flex flex-col items-center text-center py-3 rounded-md shadow-2xl md:h-52 max-h-52 "
              >
                {/* Circular Step Icon */}
                <div className="w-16 h-16 bg-blue-500 flex items-center justify-center rounded-full shadow-lg ">
                  {step.icon}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-gray-700">
                  {step.title}
                </h3>
                <p className="text-gray-600 px-4 text-base max-w-xs leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className=" px-6 md:px-20 pt-8 md:pt-16 flex items-center md:justify-between md:gap-0 gap-4 md:flex-row flex-col bg-gray-100">
        <div data-aos="zoom-out" className="container md:w-[50%] ">
          <div className="max-w-2xl space-y-4">
            <h2
              data-aos="zoom-out"
              className="text-gray-800 font-bold text-3xl md:text-5xl "
            >
              Ready to Transform Education?
            </h2>
            <p data-aos="zoom-out" className="text-gray-600">
              Join thousands of parents and teachers who are already part of our
              growing educational community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 ">
              <Button asChild size="lg">
                <Link href="/register/parent">Register Your Child</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/register/teacher">Apply as Teacher</Link>
              </Button>
            </div>
          </div>
        </div>
        <div data-aos="zoom-out">
          <Image
            src="/img/man.png"
            alt=""
            width={200}
            height={200}
            className="w-[550px] md:w-[400px]  "
          />
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
