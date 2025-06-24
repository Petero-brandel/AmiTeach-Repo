//import { Button } from "../ui/button"
import { BookOpen, Users, MapPin, Clock } from "lucide-react";
//import Link from "next/link";
//import Image from "next/image";
export default function ActionSection() {
  return (
    <div>
      <section className="bg-gray-50 px-4 md:px-8 py-16 md:py-24">
        <div className="container mx-auto">
          <div data-aos="zoom-in" className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              🚀 Why Choose Our Platform?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our hybrid education model combines the best of both worlds,
              offering personalized learning experiences for students across
              Nigeria and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              data-aos="fade-right"
              className="bg-white p-6 rounded-lg shadow-2xl  cursor-pointer"
            >
              <BookOpen className="h-10 w-10 text-gray-700 mb-4" />
              <h3 className="font-bold text-gray-700 text-2xl mb-2">
                Hybrid Learning
              </h3>
              <p className="text-gray-600 text-sm">
                60% offline classes for hands-on learning, 40% online for
                flexibility and convenience.
              </p>
            </div>

            <div
              data-aos="fade-up"
              className="bg-white p-6 rounded-lg shadow-2xl  cursor-pointer"
            >
              <Users className="h-10 w-10 text-gray-700 mb-4" />
              <h3 className="font-bold text-gray-700 text-2xl mb-2">
                Expert Teachers
              </h3>
              <p className="text-gray-600 text-sm">
                Qualified teachers undergo our TEACHERS ON TRAINING program for
                excellence.
              </p>
            </div>

            <div
              data-aos="zoom-in"
              className="bg-white p-6 rounded-lg shadow-2xl  cursor-pointer"
            >
              <MapPin className="h-10 w-10 text-gray-700 mb-4" />
              <h3 className="font-bold mb-2 text-gray-700 text-2xl">
                GPS Matching
              </h3>
              <p className="text-gray-600 text-sm">
                Smart location-based matching of teachers with students in your
                area.
              </p>
            </div>

            <div
              data-aos="fade-up"
              className="bg-white p-6 rounded-lg shadow-2xl  cursor-pointer"
            >
              <Clock className="h-10 w-10 text-text-gray-700 mb-4" />
              <h3 className="font-bold mb-2 text-gray-700 text-2xl ">
                Real-time Tracking
              </h3>
              <p className="text-gray-600 text-sm">
                Monitor attendance, performance, and payments through our
                intuitive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
    </div>
  );
}
