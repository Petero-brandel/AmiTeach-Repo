"use client";

import { useActionState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Form from "next/form";
import { Button } from "@/components/ui/button";
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
  updateParentStep3,
  completeOnboarding,
  type OnboardingActionState,
} from "../../../actions";

export default function ParentStep3() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<
    OnboardingActionState,
    FormData
  >(updateParentStep3, {
    status: "idle",
  });

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Profile completed successfully!");
      completeOnboarding("parent");
    } else if (state.status === "failed" || state.status === "invalid_data") {
      toast.error(state.message || "Failed to complete profile");
    }
  }, [state]);

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={3}
      title="Preferences & Budget"
      description="Set your preferences to help us provide the best learning experience for your children."
    >
      <Form action={formAction} className="space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Label
            htmlFor="communicationMethod"
            className="text-base font-medium"
          >
            Preferred Communication Method *
          </Label>
          <Select name="communicationMethod" required>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="How would you like teachers to contact you?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone Call</SelectItem>
              <SelectItem value="text">Text Message</SelectItem>
              <SelectItem value="app">In-App Messaging</SelectItem>
              <SelectItem value="mixed">Mixed (Email + Phone)</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="sessionFrequency" className="text-base font-medium">
            Preferred Session Frequency *
          </Label>
          <Select name="sessionFrequency" required>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="How often would you like tutoring sessions?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily (5 days/week)</SelectItem>
              <SelectItem value="frequent">Frequent (3-4 days/week)</SelectItem>
              <SelectItem value="regular">Regular (2-3 days/week)</SelectItem>
              <SelectItem value="weekly">Weekly (1-2 days/week)</SelectItem>
              <SelectItem value="biweekly">Bi-weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="asneeded">As Needed</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="budget" className="text-base font-medium">
            Budget Range (per hour) *
          </Label>
          <Select name="budget" required>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15-25">$15 - $25 per hour</SelectItem>
              <SelectItem value="25-40">$25 - $40 per hour</SelectItem>
              <SelectItem value="40-60">$40 - $60 per hour</SelectItem>
              <SelectItem value="60-80">$60 - $80 per hour</SelectItem>
              <SelectItem value="80-100">$80 - $100 per hour</SelectItem>
              <SelectItem value="100+">$100+ per hour</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-1">
            This helps us match you with teachers within your budget
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
            🎉 Almost Done!
          </h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Once you complete your profile, we&apos;ll start matching you with
            qualified teachers in your area. You&apos;ll be able to view teacher
            profiles, schedule sessions, and track your children&apos;s progress
            from your dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between pt-4"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/parent/step-2")}
          >
            Back
          </Button>
          <Button type="submit" disabled={pending} className="px-8">
            {pending ? "Completing..." : "Complete Profile"}
          </Button>
        </motion.div>
      </Form>
    </OnboardingLayout>
  );
}
