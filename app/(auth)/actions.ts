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

// Login validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional(),
});

// Register validation schema
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.string().optional(),
  role: z.string(),
});

// Teacher registration schema
const teacherSchema = registerSchema.extend({
  subjects: z.string().optional(),
  qualifications: z.string().optional(),
  contactNumber: z.string().optional(),
  address: z.string().optional(),
});

// Student registration schema
const studentSchema = registerSchema.extend({
  gradeLevel: z.string().optional(),
  learningPreferences: z.string().optional(),
});

// Parent registration schema
const parentSchema = registerSchema.extend({
  contactNumber: z.string().optional(),
  address: z.string().optional(),
});

export async function login(formData: FormData) {
  console.log("login crede", formData);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  // Validate form data
  const validatedFields = loginSchema.safeParse({
    email,
    password,
    role,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid credentials. Please check your email and password.",
    };
  }

  try {
    // Attempt to sign in
    console.log("singing in", email, password, role);
    const result = await signIn("credentials", {
      email,
      password,
      role,
      redirect: false,
    });

    if (result?.error) {
      return {
        error: "Invalid credentials. Please check your email and password.",
      };
    }

    return { success: true };
  } catch (error) {
    return {
      error: "An error occurred during login. Please try again.",
    };
  }
}

export async function registerTeacher(formData: FormData) {
  console.log("to be registered tacher", formData);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const image = formData.get("image") as string;
  const subjects = formData.get("subjects") as string;
  const qualifications = formData.get("qualifications") as string;
  const contactNumber = formData.get("contactNumber") as string;
  const address = formData.get("address") as string;
  const hourlyRate = formData.get("hourlyRate") as string;

  // Validate form data
  const validatedFields = teacherSchema.safeParse({
    name,
    email,
    password,
    role: "teacher",
    image,
    subjects,
    qualifications,
    contactNumber,
    address,
    hourlyRate,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid form data. Please check your inputs.",
    };
  }

  try {
    // Check if user already exists
    const existingUser = await getUser(email);
    if (existingUser.length > 0) {
      return {
        error: "User with this email already exists.",
      };
    }

    // Create user
    await createUser(email, password, name, "teacher", image);

    // Generate a unique teacher ID
    const teacherId = generateId("TCH");

    const teacherDetails = {
      subjects,
      qualifications,
      contactNumber,
      address,
      hourlyRate,
    };

    const createdUser = await getUser(email);

    // Create teacher record
    if (createdUser.length > 0) {
      await createTeacher({
        userId: createdUser[0].id,
        teacherId,
        isActive: true,
        hourlyRate,
        subjects,
        qualifications,
        details: teacherDetails,
      });
    }

    return { success: true };
  } catch (error) {
    return {
      error: "An error occurred during registration. Please try again.",
    };
  }
}

export async function registerStudent(formData: FormData) {
  console.log("to be registered student", formData);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const image = formData.get("image") as string;
  const gradeLevel = formData.get("gradeLevel") as string;
  const learningPreferences = formData.get("learningPreferences") as string;

  // Validate form data
  const validatedFields = studentSchema.safeParse({
    name,
    email,
    password,
    role: "student",
    image,
    gradeLevel,
    learningPreferences,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid form data. Please check your inputs.",
    };
  }

  try {
    // Check if user already exists
    const existingUser = await getUser(email);
    if (existingUser.length > 0) {
      return {
        error: "User with this email already exists.",
      };
    }

    // Create user
    await createUser(email, password, name, "student", image);

    // Generate a unique student ID
    const studentId = generateId("STD");

    const studentDetails = {
      gradeLevel,
      learningPreferences,
    };

    const createdUser = await getUser(email);

    // Create student record
    if (createdUser.length > 0) {
      await createStudent({
        userId: createdUser[0].id,
        studentId,
        gradeLevel,
        learningPreferences,
        details: studentDetails,
      });
    }

    return { success: true };
  } catch (error) {
    return {
      error: "An error occurred during registration. Please try again.",
    };
  }
}

export async function registerParent(formData: FormData) {
  console.log("to be registered parent", formData);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const image = formData.get("image") as string;
  const contactNumber = formData.get("contactNumber") as string;
  const address = formData.get("address") as string;

  // Validate form data
  const validatedFields = parentSchema.safeParse({
    name,
    email,
    password,
    role: "parent",
    image,
    contactNumber,
    address,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid form data. Please check your inputs.",
    };
  }

  try {
    // Check if user already exists
    const existingUser = await getUser(email);
    if (existingUser.length > 0) {
      return {
        error: "User with this email already exists.",
      };
    }

    // Create user
    await createUser(email, password, name, "parent", image);

    // Generate a unique parent ID
    const parentId = generateId("PAR");

    const parentDetails = {
      contactNumber,
      address,
    };

    const createdUser = await getUser(email);

    // Create parent record
    if (createdUser.length > 0) {
      await createParent({
        userId: createdUser[0].id,
        parentId,
        contactNumber,
        address,
        walletBalance: "0",
        details: parentDetails,
      });
    }

    return { success: true };
  } catch (error) {
    return {
      error: "An error occurred during registration. Please try again.",
    };
  }
}

export async function registerAdmin(formData: FormData) {
  console.log("to be registered admin", formData);
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const image = formData.get("image") as string;

  // Validate form data
  const validatedFields = registerSchema.safeParse({
    name,
    email,
    password,
    role: "admin",
    image,
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid form data. Please check your inputs.",
    };
  }

  try {
    // Check if user already exists
    const existingUser = await getUser(email);
    if (existingUser.length > 0) {
      return {
        error: "User with this email already exists.",
      };
    }

    // Create user
    await createUser(email, password, name, "admin", image);

    return { success: true };
  } catch (error) {
    return {
      error: "An error occurred during registration. Please try again.",
    };
  }
}
