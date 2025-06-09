"use client";

import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/auth/form-field";
import { FormSection } from "@/components/auth/form-section";
import { sendParentChildInfo } from "@/lib/api-utils";

interface StepTwoProps {
  onNext: (data: unknown) => void;
  onBack: () => void;
}

export function StepTwo({ onNext, onBack }: StepTwoProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    childFirstName: "",
    childLastName: "",
    dateOfBirth: "",
    gradeLevel: "",
    learningPreference: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API validation and processing
      // const result = await simulateApiCall({
      //   ...formData,
      //   step: 2,
      //   timestamp: new Date().toISOString(),
      // });
      const result = await sendParentChildInfo(formData);
      onNext(result);
    } catch (error) {
      console.error("Step 2 failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const isComplete = Object.values(formData).every(Boolean);

  return (
    <FormSection
      title="Child Information"
      description="Add your child's details for enrollment"
    >
      <div className="grid grid-cols-2 gap-4">
        <FormField label="First Name">
          <Input
            placeholder="Child's first name"
            value={formData.childFirstName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                childFirstName: e.target.value,
              }))
            }
          />
        </FormField>
        <FormField label="Last Name">
          <Input
            placeholder="Child's last name"
            value={formData.childLastName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                childLastName: e.target.value,
              }))
            }
          />
        </FormField>
      </div>

      <FormField label="Date of Birth">
        <Input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))
          }
        />
      </FormField>

      <FormField label="Grade Level">
        <Select
          value={formData.gradeLevel}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, gradeLevel: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select grade level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="primary1">Primary 1</SelectItem>
            <SelectItem value="primary2">Primary 2</SelectItem>
            <SelectItem value="primary3">Primary 3</SelectItem>
            <SelectItem value="primary4">Primary 4</SelectItem>
            <SelectItem value="primary5">Primary 5</SelectItem>
            <SelectItem value="primary6">Primary 6</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField label="Learning Preferences">
        <Select
          value={formData.learningPreference}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, learningPreference: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select learning style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="visual">Visual Learner</SelectItem>
            <SelectItem value="auditory">Auditory Learner</SelectItem>
            <SelectItem value="kinesthetic">Kinesthetic Learner</SelectItem>
          </SelectContent>
        </Select>
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
