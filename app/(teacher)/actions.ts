"use server";

import { eq } from "drizzle-orm";
import { db } from "@/lib/db/queries";
import { student, user } from "@/lib/db/schema";

export async function getStudentsByTeacherId(id: string) {
  try {
    return await db
      .select({
        id: student.id,
        userId: student.userId,
        details: student.details,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      })
      .from(student)
      .leftJoin(user, eq(student.userId, id));
  } catch (error) {
    console.error("Failed to get teacher from database");
    throw error;
  }
}
