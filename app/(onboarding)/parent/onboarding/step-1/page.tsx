"use client";

import { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "next/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import OnboardingLayout from "../../../components";
import {
  updateParentStep1,
  type OnboardingActionState,
} from "../../../actions";

export default function ParentStep1() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<
    OnboardingActionState,
    FormData
  >(updateParentStep1, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Contact information saved!");
      router.push("/parent/onboarding/step-2");
    } else if (state.status === "failed" || state.status === "invalid_data") {
      toast.error(state.message || "Failed to save contact information");
    }
  }, [state, router]);

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={3}
      title="Welcome to AMI Education!"
      description="Please provide more contact contact details about you."
    >
      <Form action={formAction} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label htmlFor="contactNumber" className="text-base font-medium">
            Phone Number *
          </Label>
          <Input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            className="mt-2"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            We&apos;ll use this to contact you about your child&apos;s progress
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="address" className="text-base font-medium">
            Home Address *
          </Label>
          <Input
            id="address"
            name="address"
            placeholder="123 Main Street, City, State, ZIP"
            className="mt-2"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            This helps us find teachers in your area
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end pt-4"
        >
          <Button type="submit" disabled={pending} className="px-8">
            {pending ? "Saving..." : "Continue"}
          </Button>
        </motion.div>
      </Form>
    </OnboardingLayout>
  );
}
