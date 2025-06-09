"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { FormField } from "@/components/auth/form-field";
import { FormSection } from "@/components/auth/form-section";
import { FileUpload } from "@/components/auth/file-upload";
import { sendParentChildDocs } from "@/lib/api-utils";

interface StepThreeProps {
  onBack: () => void;
  onComplete: () => void;
}

export function StepThree({ onBack }: StepThreeProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>(
    {}
  );

  const handleFileUpload = (fileType: string) => (url: string) => {
    setUploadedFiles((prev) => ({ ...prev, [fileType]: url }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call with uploaded files
      await sendParentChildDocs(uploadedFiles);

      // Redirect to dashboard after successful registration
      router.push("/dashboard/parent");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const isComplete = Object.keys(uploadedFiles).length >= 2; // At least birth certificate and immunization records

  return (
    <FormSection
      title="Documentation"
      description="Upload required documents to complete registration"
    >
      <FormField label="Birth Certificate">
        <FileUpload
          label="Birth Certificate"
          accept="image/*,.pdf"
          required
          onUploadComplete={handleFileUpload("birthCertificate")}
        />
      </FormField>

      <FormField label="Previous School Records (Optional)">
        <FileUpload
          label="School Records"
          accept="image/*,.pdf"
          onUploadComplete={handleFileUpload("schoolRecords")}
        />
      </FormField>

      <FormField label="Immunization Records">
        <FileUpload
          label="Immunization Records"
          accept="image/*,.pdf"
          required
          onUploadComplete={handleFileUpload("immunizationRecords")}
        />
      </FormField>

      <div className="flex gap-4">
        <LoadingButton
          variant="outline"
          className="w-full"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </LoadingButton>
        <LoadingButton
          className="w-full"
          onClick={handleSubmit}
          loading={loading}
          disabled={!isComplete}
        >
          Complete Registration
        </LoadingButton>
      </div>
    </FormSection>
  );
}
