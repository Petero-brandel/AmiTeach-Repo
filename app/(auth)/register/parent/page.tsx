"use client";

import { useState } from "react";
import { ProgressIndicator } from "@/components/registration/progress-indicator";
import { AuthLayout } from "@/components/auth/auth-layout";
import { registerParent, registerStudent } from "../../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PersonalInfoStep } from "@/components/parent-registration/personal-info-step";

export default function StudentRegistration() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal info
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    state: "",
    profilePhoto: "",
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Create FormData object for the server action
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("password", formData.password);
      submitData.append("role", "parent");
      submitData.append("contactNumber", formData.phoneNumber);
      submitData.append("address", formData.state);

      // Add profile photo if available
      if (formData.profilePhoto) {
        submitData.append("image", formData.profilePhoto);
      }

      // Call the server action
      const result = await registerParent(submitData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast("Registration Successful");
        // Redirect to login page
        router.push("/login");
      }
    } catch (error) {
      toast("Registration Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Give Your Child the Best Education"
      description="Register now to access our hybrid learning platform and connect with qualified teachers in your area."
    >
      <main className="flex-1 overflow-auto">
        <div className="max-w-[500px] mx-auto p-4 lg:p-8 space-y-8"></div>
      </main>
    </AuthLayout>
  );
}
