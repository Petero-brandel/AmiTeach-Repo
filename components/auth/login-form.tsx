"use client";

import { Button } from "@/components/ui/button";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
import { LoadingButton } from "@/components/ui/loading-button";
import { simulateApiCall } from "@/lib/api-utils";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await simulateApiCall({ role, email, password });
      router.push(`/dashboard/${role}`);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormSection
      title="Sign in to your account"
      description="Choose your role and enter your credentials"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Role">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Email">
          <Input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormField>

        <FormField label="Password">
          <Input
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>

        <Button variant="link" className="text-sm p-0">
          Forgot password?
        </Button>

        <LoadingButton
          type="submit"
          className="w-full"
          loading={loading}
          disabled={!role || !email || !password}
        >
          Sign in
        </LoadingButton>

        <div className="text-center text-sm">
          <span className="text-gray-500">Don&apos;t have an account?</span>{" "}
          <Link
            href="/register"
            className="text-primary hover:underline font-medium"
          >
            Register now
          </Link>
        </div>
      </form>
    </FormSection>
  );
}
