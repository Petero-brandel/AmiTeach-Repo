"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressIndicator } from "@/components/registration/progress-indicator";
import { PersonalInfoStep } from "@/components/teacher-registration/personal-info-step";
import { ProfessionalInfoStep } from "@/components/teacher-registration/professional-info-step";
import { DocumentationStep } from "@/components/teacher-registration/documentation-step";
import { registerTeacher } from "@/app/(auth)/actions";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/auth-layout";

export default function TeacherRegistration() {
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

    // Professional info
    qualification: "",
    experience: "",
    subjects: [] as string[],
    introduction: "",

    // Documentation (URLs instead of File objects)
    resume: "",
    certificates: "",
    governmentId: "",
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
      submitData.append("role", "teacher");
      submitData.append("contactNumber", formData.phoneNumber);
      submitData.append("address", formData.state);
      submitData.append("subjects", JSON.stringify(formData.subjects));
      submitData.append("qualifications", formData.qualification);
      submitData.append("resume", formData.resume);
      submitData.append("governmentId", formData.resume);
      submitData.append("profilePhoto", formData.resume);

      // Add profile photo if available
      if (formData.profilePhoto) {
        submitData.append("image", formData.profilePhoto);
      }

      // Call the server action
      const result = await registerTeacher(submitData);

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
      title="Join Our Teaching Community"
      description="Apply now to become part of our innovative hybrid learning platform and shape the future of education."
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
            <ProfessionalInfoStep
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <DocumentationStep
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
