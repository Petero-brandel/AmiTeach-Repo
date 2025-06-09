"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LanguageSelector } from "@/components/language-selector";
import { ProgressIndicator } from "@/components/registration/progress-indicator";
import { PersonalInfoStep } from "@/components/student-registration/personal-info-step";
import { AcademicInfoStep } from "@/components/student-registration/academic-info-step";
import { ParentInfoStep } from "@/components/student-registration/parent-info-step";
import { AuthLayout } from "@/components/auth/auth-layout";
import { registerStudent } from "../../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

    // Academic info
    gradeLevel: "",
    learningPreferences: "",
    interests: "",

    // Parent info
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    relationship: "",
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
      submitData.append("role", "student");
      submitData.append("contactNumber", formData.phoneNumber);
      submitData.append("address", formData.state);
      submitData.append("gradeLevel", formData.gradeLevel);
      submitData.append("learningPreferences", formData.learningPreferences);
      submitData.append("interests", formData.interests);
      submitData.append("parentName", formData.parentName);
      submitData.append("parentEmail", formData.parentEmail);
      submitData.append("parentPhone", formData.parentPhone);
      submitData.append("relationship", formData.relationship);

      // Add profile photo if available
      if (formData.profilePhoto) {
        submitData.append("image", formData.profilePhoto);
      }

      // Call the server action
      const result = await registerStudent(submitData);

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
      title="Begin Your Learning Journey"
      description="Register now to access our hybrid learning platform and connect with qualified teachers."
    >
      <main className="flex-1 overflow-auto">
        <div className="max-w-[500px] mx-auto p-4 lg:p-8 space-y-8">
          {/* Progress Indicator */}
          <ProgressIndicator currentStep={step} totalSteps={3} />

          {/* Step Content */}
          {step === 1 && (
            <PersonalInfoStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
            />
          )}

          {step === 2 && (
            <AcademicInfoStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <ParentInfoStep
              formData={formData}
              isSubmitting={isSubmitting}
              updateFormData={updateFormData}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </main>
    </AuthLayout>
  );
}
