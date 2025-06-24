"use server";

import { auth } from "@/app/(auth)/auth";
import { db } from "@/lib/db/queries";
import { teacher, parent, student, user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { z } from "zod";

export interface OnboardingActionState {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
  message?: string;
}

// Teacher Step 1 - Profile Information
const teacherStep1Schema = z.object({
  qualifications: z.string().min(10, "Please provide detailed qualifications"),
  experience: z.string().min(1, "Please select your experience level"),
  bio: z.string().min(20, "Please provide a detailed bio"),
});

export async function updateTeacherStep1(
  _: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/login");
    }

    const validatedData = teacherStep1Schema.parse({
      qualifications: formData.get("qualifications"),
      experience: formData.get("experience"),
      bio: formData.get("bio"),
    });

    // Check if teacher record exists
    const existingTeacher = await db
      .select()
      .from(teacher)
      .where(eq(teacher.userId, session.user.id))
      .limit(1);

    const teacherData = {
      userId: session.user.id,
      teacherId: `TCH${Date.now()}`,
      qualifications: validatedData.qualifications,
      details: JSON.stringify({
        experience: validatedData.experience,
        bio: validatedData.bio,
        step: 1,
      }),
    };

    if (existingTeacher.length > 0) {
      await db
        .update(teacher)
        .set(teacherData)
        .where(eq(teacher.userId, session.user.id));
    } else {
      await db.insert(teacher).values(teacherData);
    }

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data", message: error.errors[0].message };
    }
    console.error("Teacher step 1 error:", error);
    return { status: "failed", message: "Failed to save profile information" };
  }
}

// Teacher Step 2 - Subjects and Teaching Style
const teacherStep2Schema = z.object({
  teachingStyle: z.string().min(1, "Please select a teaching style"),
});

export async function updateTeacherStep2(
  _: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/login");
    }

    const subjects = formData.getAll("subjects") as string[];
    const gradeLevels = formData.getAll("gradeLevel") as string[];

    if (subjects.length === 0) {
      return {
        status: "invalid_data",
        message: "Please select at least one subject",
      };
    }

    if (gradeLevels.length === 0) {
      return {
        status: "invalid_data",
        message: "Please select at least one grade level",
      };
    }

    const validatedData = teacherStep2Schema.parse({
      teachingStyle: formData.get("teachingStyle"),
    });

    // Get existing teacher record
    const existingTeacher = await db
      .select()
      .from(teacher)
      .where(eq(teacher.userId, session.user.id))
      .limit(1);

    if (existingTeacher.length === 0) {
      return { status: "failed", message: "Teacher profile not found" };
    }

    const existingDetails = existingTeacher[0].details
      ? JSON.parse(existingTeacher[0].details as string)
      : {};

    const updatedDetails = {
      ...existingDetails,
      teachingStyle: validatedData.teachingStyle,
      gradeLevels,
      step: 2,
    };

    await db
      .update(teacher)
      .set({
        subjects: JSON.stringify(subjects),
        details: JSON.stringify(updatedDetails),
      })
      .where(eq(teacher.userId, session.user.id));

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data", message: error.errors[0].message };
    }
    console.error("Teacher step 2 error:", error);
    return { status: "failed", message: "Failed to save subject information" };
  }
}

// Teacher Step 3 - Availability and Rates
const teacherStep3Schema = z.object({
  hourlyRate: z.string().min(1, "Please set your hourly rate"),
  address: z.string().min(5, "Please provide your address"),
  city: z.string().min(2, "Please provide your city"),
  state: z.string().min(2, "Please provide your state"),
});

export async function updateTeacherStep3(
  _: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/login");
    }

    const availability = formData.getAll("availability") as string[];

    if (availability.length === 0) {
      return {
        status: "invalid_data",
        message: "Please select your availability",
      };
    }

    const validatedData = teacherStep3Schema.parse({
      hourlyRate: formData.get("hourlyRate"),
      address: formData.get("address"),
      city: formData.get("city"),
      state: formData.get("state"),
    });

    // Get existing teacher record
    const existingTeacher = await db
      .select()
      .from(teacher)
      .where(eq(teacher.userId, session.user.id))
      .limit(1);

    if (existingTeacher.length === 0) {
      return { status: "failed", message: "Teacher profile not found" };
    }

    const existingDetails = existingTeacher[0].details
      ? JSON.parse(existingTeacher[0].details as string)
      : {};

    const updatedDetails = {
      ...existingDetails,
      availability,
      address: validatedData.address,
      city: validatedData.city,
      state: validatedData.state,
      step: 3,
      completed: true,
    };

    const location = {
      address: validatedData.address,
      city: validatedData.city,
      state: validatedData.state,
    };

    await db
      .update(teacher)
      .set({
        location: JSON.stringify(location),
        details: JSON.stringify(updatedDetails),
        isActive: true,
      })
      .where(eq(teacher.userId, session.user.id));

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data", message: error.errors[0].message };
    }
    console.error("Teacher step 3 error:", error);
    return { status: "failed", message: "Failed to complete profile" };
  }
}

// Parent Step 1 - Contact Information
const parentStep1Schema = z.object({
  contactNumber: z.string().min(10, "Please provide a valid phone number"),
  address: z.string().min(10, "Please provide your full address"),
});

export async function updateParentStep1(
  _: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/login");
    }

    const validatedData = parentStep1Schema.parse({
      contactNumber: formData.get("contactNumber"),
      address: formData.get("address"),
    });

    // Check if parent record exists
    const existingParent = await db
      .select()
      .from(parent)
      .where(eq(parent.userId, session.user.id))
      .limit(1);

    const parentData = {
      contactNumber: validatedData.contactNumber,
      address: validatedData.address,
    };

    if (existingParent.length > 0) {
      await db
        .update(parent)
        .set(parentData)
        .where(eq(parent.userId, session.user.id));
    } else {
      throw new Error("Parent record not found");
    }

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data", message: error.errors[0].message };
    }
    console.error("Parent step 1 error:", error);
    return { status: "failed", message: "Failed to save contact information" };
  }
}

// Parent Step 2 - Children Information
export async function updateParentStep2(
  _: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/login");
    }

    // Parse children data from form
    const children: any[] = [];
    let index = 0;

    while (formData.get(`children[${index}].name`)) {
      const name = formData.get(`children[${index}].name`) as string;
      const age = formData.get(`children[${index}].age`) as string;
      const gradeLevel = formData.get(
        `children[${index}].gradeLevel`
      ) as string;
      const learningStyle = formData.get(
        `children[${index}].learningStyle`
      ) as string;
      const subjects = formData.getAll(
        `children[${index}].subjects`
      ) as string[];

      if (!name || !age || !gradeLevel || subjects.length === 0) {
        return {
          status: "invalid_data",
          message: `Please complete all information for child ${index + 1}`,
        };
      }

      children.push({
        name,
        age: Number.parseInt(age),
        gradeLevel,
        learningStyle,
        subjects,
      });

      index++;
    }

    if (children.length === 0) {
      return {
        status: "invalid_data",
        message: "Please add at least one child",
      };
    }

    // Get existing parent record
    const existingParent = await db
      .select()
      .from(parent)
      .where(eq(parent.userId, session.user.id))
      .limit(1);

    if (existingParent.length === 0) {
      return { status: "failed", message: "Parent profile not found" };
    }

    const existingDetails = existingParent[0].details
      ? JSON.parse(existingParent[0].details as string)
      : {};

    const updatedDetails = {
      ...existingDetails,
      children,
      step: 2,
    };

    await db
      .update(parent)
      .set({
        details: JSON.stringify(updatedDetails),
      })
      .where(eq(parent.userId, session.user.id));

    return { status: "success" };
  } catch (error) {
    console.error("Parent step 2 error:", error);
    return { status: "failed", message: "Failed to save children information" };
  }
}

// Parent Step 3 - Preferences
const parentStep3Schema = z.object({
  communicationMethod: z.string().min(1, "Please select communication method"),
  sessionFrequency: z.string().min(1, "Please select session frequency"),
  budget: z.string().min(1, "Please select budget range"),
});

export async function updateParentStep3(
  _: OnboardingActionState,
  formData: FormData
): Promise<OnboardingActionState> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/login");
    }

    const validatedData = parentStep3Schema.parse({
      communicationMethod: formData.get("communicationMethod"),
      sessionFrequency: formData.get("sessionFrequency"),
      budget: formData.get("budget"),
    });

    // Get existing parent record
    const existingParent = await db
      .select()
      .from(parent)
      .where(eq(parent.userId, session.user.id))
      .limit(1);

    if (existingParent.length === 0) {
      return { status: "failed", message: "Parent profile not found" };
    }

    const existingDetails = existingParent[0].details
      ? JSON.parse(existingParent[0].details as string)
      : {};

    const updatedDetails = {
      ...existingDetails,
      preferences: {
        communicationMethod: validatedData.communicationMethod,
        sessionFrequency: validatedData.sessionFrequency,
        budget: validatedData.budget,
      },
      step: 3,
      completed: true,
    };

    await db
      .update(parent)
      .set({
        details: JSON.stringify(updatedDetails),
      })
      .where(eq(parent.userId, session.user.id));

    // Create student records for each child
    const children = existingDetails.children || [];
    const parentRecord = existingParent[0];

    for (const child of children) {
      // Create user account for child
      const childUser = await db
        .insert(user)
        .values({
          name: child.name,
          email: `${child.name
            .toLowerCase()
            .replace(/\s+/g, ".")}@temp.ami.com`,
          role: "student",
        })
        .returning();

      // Create student record
      await db.insert(student).values({
        userId: childUser[0].id,
        studentId: `STU${Date.now()}${Math.random().toString(36).substr(2, 4)}`,
        parentId: parentRecord.id,
        gradeLevel: child.gradeLevel,
        learningPreferences: child.learningStyle,
        details: JSON.stringify({
          subjects: child.subjects,
          age: child.age,
        }),
        status: "New",
      });
    }

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data", message: error.errors[0].message };
    }
    console.error("Parent step 3 error:", error);
    return { status: "failed", message: "Failed to complete profile" };
  }
}

export async function completeOnboarding(role: "teacher" | "parent") {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/login");
    }

    if (role === "teacher") {
      redirect("/teacher/dashboard");
    } else if (role === "parent") {
      redirect("/parent");
    }
  } catch (error) {
    console.error("Complete onboarding error:", error);
    redirect("/");
  }
}
