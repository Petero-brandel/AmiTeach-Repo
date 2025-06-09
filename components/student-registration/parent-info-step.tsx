"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ParentInfoStepProps {
  formData: {
    parentName: string;
    parentEmail: string;
    parentPhone: string;
    relationship: string;
  };
  isSubmitting: boolean;
  updateFormData: (data: Partial<ParentInfoStepProps["formData"]>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function ParentInfoStep({
  formData,
  isSubmitting,
  updateFormData,
  onSubmit,
  onBack,
}: ParentInfoStepProps) {
  const isFormValid = () => {
    return formData.parentName && formData.parentEmail && formData.parentPhone;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Parent/Guardian Information</h2>
        <p className="text-sm text-gray-500 mt-1">
          Provide details of your parent or guardian
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Parent/Guardian Name</Label>
          <Input
            placeholder="Enter full name"
            value={formData.parentName}
            onChange={(e) => updateFormData({ parentName: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Parent/Guardian Email</Label>
          <Input
            type="email"
            placeholder="Enter email"
            value={formData.parentEmail}
            onChange={(e) => updateFormData({ parentEmail: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Parent/Guardian Phone</Label>
          <Input
            placeholder="Enter phone number"
            value={formData.parentPhone}
            onChange={(e) => updateFormData({ parentPhone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Relationship</Label>
          <Input
            placeholder="E.g. Mother, Father, Guardian"
            value={formData.relationship}
            onChange={(e) => updateFormData({ relationship: e.target.value })}
          />
        </div>

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
      </div>
    </div>
  );
}
