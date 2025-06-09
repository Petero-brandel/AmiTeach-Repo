"use client";

import { useState } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { registerAdmin, registerParent, registerStudent } from "../../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PersonalInfoStep } from "@/components/admin-registration/personal-info-step";

export default function AdminRegistration() {
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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Create FormData object for the server action
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("password", formData.password);
      submitData.append("role", "admin");

      // Add profile photo if available
      if (formData.profilePhoto) {
        submitData.append("image", formData.profilePhoto);
      }

      // Call the server action
      const result = await registerAdmin(submitData);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast("Registration Successful");
        // Redirect to login page
        router.push("/login-admin");
      }
    } catch (error) {
      toast("Registration Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Admin" description="Admin.">
      <main className="flex-1 overflow-auto">
        <div className="max-w-[500px] mx-auto p-4 lg:p-8 space-y-8"></div>
      </main>
    </AuthLayout>
  );
}
