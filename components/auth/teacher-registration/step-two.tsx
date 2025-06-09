"use client";

import { useEffect, useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/components/auth/form-field";
import { FormSection } from "@/components/auth/form-section";
import { sendProfessionalInfo } from "@/lib/api-utils";
import { SubjectsSelect } from "@/components/subjects-select";

interface StepTwoProps {
  onNext: (data: unknown) => void;
  onBack: () => void;
}

export function StepTwo({ onNext, onBack }: StepTwoProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    highestQualification: "",
    yearsOfExperience: "",
    primarySubjects: [] as string[],
    introduction: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await sendProfessionalInfo(formData);
      console.log("Step 2 result:", result);
      onNext(result);
    } catch (error) {
      console.error("Step 2 failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("form data", formData);
  }, [formData]);

  const isComplete = Object.values(formData).every(Boolean);

  return (
    <FormSection
      title="Professional Information"
      description="Tell us about your teaching experience"
    >
      <FormField label="Highest Qualification">
        <Select
          value={formData.highestQualification}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, highestQualification: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select qualification" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bachelors">Bachelor&apos;s Degree</SelectItem>
            <SelectItem value="masters">Master&apos;s Degree</SelectItem>
            <SelectItem value="phd">PhD</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Years of Teaching Experience">
        <Select
          value={formData.yearsOfExperience}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, yearsOfExperience: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-2">0-2 years</SelectItem>
            <SelectItem value="3-5">3-5 years</SelectItem>
            <SelectItem value="6-10">6-10 years</SelectItem>
            <SelectItem value="10+">10+ years</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Subjects">
        <SubjectsSelect
          selectedSubjects={formData.primarySubjects}
          onSubjectsChange={(subjects) =>
            setFormData((prev) => ({ ...prev, primarySubjects: subjects }))
          }
        />
      </FormField>

      <FormField label="Brief Introduction">
        <Textarea
          placeholder="Tell us about your teaching philosophy and approach"
          className="h-32"
          value={formData.introduction}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, introduction: e.target.value }))
          }
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
          Continue
        </LoadingButton>
      </div>
    </FormSection>
  );
}
