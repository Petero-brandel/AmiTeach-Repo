"use server";

import { z } from "zod";

import {
  createParent,
  createStudent,
  createTeacher,
  createUser,
  getUser,
} from "@/lib/db/queries";

import { signIn } from "./auth";
import { generateId } from "@/lib/utils";
import { UserRole } from "@/lib/db/schema";

// Login validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // role: z.string().optional(),
});

export interface LoginActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
}

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    console.log("login", formData);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validate form data
    const validatedData = loginSchema.parse({
      email,
      password,
    });

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

// Register validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.string().optional(),
  role: z.enum(["teacher", "student", "parent", "admin"]),
});

export interface RegisterActionState {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
}

export const register = async (
  _: RegisterActionState,
  formData: FormData
): Promise<RegisterActionState> => {
  try {
    console.log("register", formData);
    // Validate form data
    const validatedData = registerSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      image: formData.get("image"),
      role: formData.get("role"),
    });

    // Check if user already exists
    const [user] = await getUser(validatedData.email);

    if (user) {
      return { status: "user_exists" } as RegisterActionState;
    }

    await createUser(
      validatedData.email,
      validatedData.password,
      validatedData.name,
      validatedData.role,
      validatedData.image
    );

    await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};
