"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegistrationPage() {
  return (
    <AuthLayout
      title="Start Your Educational Journey Today"
      description="Join our award-winning hybrid learning platform where traditional education meets innovative technology. Whether you're a student eager to learn, a parent supporting your child's education, or an educator ready to inspire the next generation, there's a place for you in our community."
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
          <Button asChild size="lg" className="text-base">
            <Link href="/register/student">Register as Student</Link>
          </Button>
          <Button asChild size="lg" className="text-base">
            <Link href="/register/parent">Register as Parent</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/register/teacher">Join as Teacher</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold text-lg mb-2">For Students</h3>
            <p className="text-sm text-muted-foreground">
              Begin your personalized learning experience with interactive
              lessons, expert tutoring, and progress tracking designed to help
              you succeed.
            </p>
          </div>

          <div className="p-4 bg-green-50 rounded-md">
            <h3 className="font-semibold text-lg mb-2">For Parents</h3>
            <p className="text-sm text-muted-foreground">
              Monitor your child&apos;s educational progress, manage payments,
              and communicate with qualified teachers who are dedicated to your
              child&apos;s success.
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-md">
            <h3 className="font-semibold text-lg mb-2">For Teachers</h3>
            <p className="text-sm text-muted-foreground">
              Join our network of educators, share your expertise, and enjoy
              flexibility while making a significant impact on students&apos;
              educational journeys.
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          By registering, you&apos;ll gain access to personalized learning
          paths, interactive content, and a supportive community dedicated to
          educational excellence.
        </p>
      </div>
    </AuthLayout>
  );
}
