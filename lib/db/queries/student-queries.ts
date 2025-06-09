import { db } from "../queries";
import { student, user } from "../schema";
import { eq } from "drizzle-orm";

export async function getStudentById(studentId: string) {
  try {
    return await db
      .select()
      .from(student)
      .where(eq(student.id, studentId))
      .leftJoin(user, eq(student.userId, user.id));
  } catch (error) {
    console.error("Failed to fetch student by ID:", error);
    throw error;
  }
}

export async function createStudent(data: any) {
  try {
    return await db.insert(student).values(data);
  } catch (error) {
    console.error("Failed to create student:", error);
    throw error;
  }
}

export async function updateStudent(studentId: string, data: any) {
  try {
    return await db.update(student).set(data).where(eq(student.id, studentId));
  } catch (error) {
    console.error("Failed to update student:", error);
    throw error;
  }
}

export async function deleteStudent(studentId: string) {
  try {
    return await db.delete(student).where(eq(student.id, studentId));
  } catch (error) {
    console.error("Failed to delete student:", error);
    throw error;
  }
}
