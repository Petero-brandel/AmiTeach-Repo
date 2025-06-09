"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { FormField } from "@/components/auth/form-field";
import { FormSection } from "@/components/auth/form-section";
import { FileUpload } from "@/components/auth/file-upload";
import { sendDocuments } from "@/lib/api-utils";

interface StepThreeProps {
  onBack: () => void;
  onComplete: () => void;
}

export function StepThree({ onBack, onComplete }: StepThreeProps) {
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
    onComplete();
    try {
      await sendDocuments(uploadedFiles);

      // Redirect to dashboard after successful registration
      router.push("/dashboard/teacher");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(uploadedFiles);
  }, [uploadedFiles]);

  const isComplete = Object.keys(uploadedFiles).length >= 3; // Resume, certificates, and ID required

  return (
    <FormSection title="Documentation" description="Upload required documents">
      <FormField label="Resume/CV">
        <FileUpload
          label="Resume/CV"
          accept=".pdf,.doc,.docx"
          required
          onUploadComplete={handleFileUpload("resume")}
        />
      </FormField>

      <FormField label="Teaching Certificates">
        <FileUpload
          label="Teaching Certificates"
          accept="image/*,.pdf"
          required
          onUploadComplete={handleFileUpload("certificates")}
        />
      </FormField>

      <FormField label="Government ID">
        <FileUpload
          label="Government ID"
          accept="image/*,.pdf"
          required
          onUploadComplete={handleFileUpload("governmentId")}
        />
      </FormField>

      <FormField label="Profile Photo">
        <FileUpload
          label="Profile Photo"
          accept="image/*"
          onUploadComplete={handleFileUpload("profilePhoto")}
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
