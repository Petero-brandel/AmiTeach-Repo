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
import { SubjectsSelect } from "../subjects-select";

interface ProfessionalInfoStepProps {
  formData: {
    qualification: string;
    experience: string;
    subjects: string[];
    introduction: string;
  };
  updateFormData: (
    data: Partial<ProfessionalInfoStepProps["formData"]>
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

export function ProfessionalInfoStep({
  formData,
  updateFormData,
  onNext,
  onBack,
}: ProfessionalInfoStepProps) {
  const isFormValid = () => {
    return (
      formData.qualification &&
      formData.experience &&
      formData.subjects &&
      formData.introduction
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Professional Information</h2>
        <p className="text-sm text-gray-500 mt-1">
          Tell us about your teaching experience
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Highest Qualification</Label>
          <Select
            value={formData.qualification}
            onValueChange={(value) => updateFormData({ qualification: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bachelors">Bachelora&apos;s Degree</SelectItem>
              <SelectItem value="masters">Mastera&apos;s Degree</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Years of Teaching Experience</Label>
          <Select
            value={formData.experience}
            onValueChange={(value) => updateFormData({ experience: value })}
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
        </div>

        <div className="space-y-2">
          <Label>Subjects</Label>
          <SubjectsSelect
            selectedSubjects={formData.subjects}
            onSubjectsChange={(subject) =>
              updateFormData({ subjects: subject })
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Brief Introduction</Label>
          <Textarea
            placeholder="Tell us about your teaching philosophy and approach"
            className="h-32"
            value={formData.introduction}
            onChange={(e) => updateFormData({ introduction: e.target.value })}
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
