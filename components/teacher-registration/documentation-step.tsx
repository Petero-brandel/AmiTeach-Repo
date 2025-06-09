"use client";

import { useState, useEffect } from "react";
import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadFile } from "@/lib/api-utils"; // Assume this utility uploads files and returns a URL
import { FormSection } from "../auth/form-section";
import { LoadingButton } from "../ui/loading-button";
import { FormField } from "../auth/form-field";
import { FileUpload } from "../auth/file-upload";

interface DocumentationStepProps {
  formData: {
    resume: string;
    certificates: string;
    governmentId: string;
    profilePhoto: string;
  };
  isSubmitting: boolean;
  updateFormData: (data: Partial<DocumentationStepProps["formData"]>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function DocumentationStep({
  formData,
  isSubmitting,
  updateFormData,
  onSubmit,
  onBack,
}: DocumentationStepProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>(
    {}
  );

  const handleFileUpload = (fileType: string) => (url: string) => {
    setUploadedFiles((prev) => ({ ...prev, [fileType]: url }));
  };

  useEffect(() => {
    updateFormData(uploadedFiles);
  }, [uploadedFiles]);

  const isFormValid = () => {
    return formData.resume && formData.certificates && formData.governmentId;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Documentation</h2>
        <p className="text-sm text-gray-500 mt-1">Upload required documents</p>
      </div>

      <div className="space-y-4">
        <FormSection
          title="Documentation"
          description="Upload required documents"
        >
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

          <div className="flex gap-2">
            <Button variant="outline" className="w-1/2" onClick={onBack}>
              Back
            </Button>
            <Button
              className="w-1/2"
              onClick={onSubmit}
              disabled={!isFormValid() || isSubmitting}
            >
              Complete Registration
            </Button>
          </div>
        </FormSection>
      </div>
    </div>
  );
}
