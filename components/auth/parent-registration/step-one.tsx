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
import { sendParentPersonalInfo } from "@/lib/api-utils";

interface StepOneProps {
  onNext: (data: unknown) => void;
}

export function StepOne({ onNext }: StepOneProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    state: "",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await sendParentPersonalInfo(formData);
      onNext(result);
    } catch (error) {
      console.error("Step 1 failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const isComplete = Object.values(formData).every(Boolean);

  return (
    <FormSection
      title="Parent Information"
      description="Please provide your details to create an account"
    >
      <div className="grid grid-cols-2 gap-4">
        <FormField label="First Name">
          <Input
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
        </FormField>
        <FormField label="Last Name">
          <Input
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </FormField>
      </div>

      <FormField label="Email">
        <Input
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </FormField>

      <FormField label="Phone Number">
        <div className="flex gap-2">
          <Select defaultValue="+234">
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+234">+234</SelectItem>
              <SelectItem value="+233">+233</SelectItem>
              <SelectItem value="+254">+254</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter phone number"
            className="flex-1"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
            }
          />
        </div>
      </FormField>

      <FormField label="State">
        <Select
          value={formData.state}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, state: value }))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ebonyi">Ebonyi</SelectItem>
            <SelectItem value="kogi">Kogi</SelectItem>
            <SelectItem value="kwara">Kwara</SelectItem>
            <SelectItem value="kaduna">Kaduna</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <LoadingButton
        className="w-full"
        onClick={handleSubmit}
        loading={loading}
        disabled={!isComplete}
      >
        Continue
      </LoadingButton>
    </FormSection>
  );
}
