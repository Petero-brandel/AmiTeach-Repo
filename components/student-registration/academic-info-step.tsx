"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface AcademicInfoStepProps {
  formData: {
    gradeLevel: string;
    learningPreferences: string;
    interests: string;
  };
  updateFormData: (data: Partial<AcademicInfoStepProps["formData"]>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AcademicInfoStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: AcademicInfoStepProps) {
  const isFormValid = () => {
    return formData.gradeLevel && formData.learningPreferences;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Academic Information</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us about your academic preferences
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Grade Level</Label>
          <Select
            value={formData.gradeLevel}
            onValueChange={(value) => updateFormData({ gradeLevel: value })}
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
        </div>

        <div className="space-y-2">
          <Label>Learning Preferences</Label>
          <Select
            value={formData.learningPreferences}
            onValueChange={(value) =>
              updateFormData({ learningPreferences: value })
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
        </div>

        <div className="space-y-2">
          <Label>Interests and Hobbies (Optional)</Label>
          <Textarea
            placeholder="Tell us about your interests and hobbies"
            className="h-32"
            value={formData.interests}
            onChange={(e) => updateFormData({ interests: e.target.value })}
          />
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="w-1/2" onClick={onBack}>
            Back
          </Button>
          <Button className="w-1/2" onClick={onNext} disabled={!isFormValid()}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
