import "server-only";

import { genSaltSync, hashSync } from "bcrypt-ts";
import { count, desc, eq, like } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import {
  user,
  teacher,
  student,
  parent,
  type UserRole,
  type User,
} from "./schema";

const client = postgres(process.env.POSTGRES_URL!);
export const db = drizzle(client);

export async function getUser(email: string): Promise<Array<User>> {
  try {
    return await db.select().from(user).where(eq(user.email, email));
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

export async function createUser(
  email: string,
  password: string,
  name: string,
  role: UserRole,
  image?: string
) {
  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    return await db
      .insert(user)
      .values({ email, password: hash, name, role, image });
  } catch (error) {
    console.error("Failed to create user in database");
    throw error;
  }
}

export async function createTeacher(data: any) {
  try {
    return await db.insert(teacher).values(data);
  } catch (error) {
    console.error("Failed to create teacher in database");
    throw error;
  }
}

export async function createStudent(data: any) {
  try {
    return await db.insert(student).values(data);
  } catch (error) {
    console.error("Failed to create student in database");
    throw error;
  }
}

// Patient queries
export async function getStudents(
  page = 1,
  limit = 10,
  search?: string,
  status?: string
) {
  try {
    const offset = (page - 1) * limit;
    const query = db
      .select({
        id: student.id,
        userId: student.userId,
        patientId: student.studentId,
        status: student.status,
        details: student.details,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      })
      .from(student)
      .leftJoin(user, eq(student.userId, user.id))
      .limit(limit)
      .offset(offset);

    if (search) {
      // Todo: Search based on or patientId
      query.where(like(user.name, `%${search}%`));
    }

    if (status) {
      query.where(eq(student.status, status));
    }

    return await query.orderBy(desc(student.createdAt));
  } catch (error) {
    console.error("Failed to get patients from database");
    throw error;
  }
}

export async function getStudentsCount(search?: string, status?: string) {
  try {
    const query = db
      .select({ count: count() })
      .from(student)
      .leftJoin(user, eq(student.userId, user.id));

    if (search) {
      query.where(like(user.name, `%${search}%`));
    }

    if (status) {
      query.where(eq(student.status, status));
    }

    const result = await query;
    console.log("query count result", result);
    return result[0].count;
  } catch (error) {
    console.error("Failed to get patients count from database");
    throw error;
  }
}

export async function createParent(data: any) {
  try {
    return await db.insert(parent).values(data);
  } catch (error) {
    console.error("Failed to create parent in database");
    throw error;
  }
}

export async function getTeacherById(id: string) {
  try {
    return await db
      .select({
        id: teacher.id,
        userId: teacher.userId,
        teacherId: teacher.teacherId,
        isActive: teacher.isActive,
        hourlyRate: teacher.hourlyRate,
        specialization: teacher.subjects,
        qualifications: teacher.qualifications,
        location: teacher.location,
        details: teacher.details,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      })
      .from(teacher)
      .leftJoin(user, eq(teacher.userId, id));
  } catch (error) {
    console.error("Failed to get teacher from database");
    throw error;
  }
}

export async function getParentById(id: string) {
  try {
    return await db
      .select({
        id: parent.id,
        userId: parent.userId,
        parentId: parent.parentId,
        contactNumber: parent.contactNumber,
        address: parent.address,
        details: parent.details,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      })
      .from(parent)
      .leftJoin(user, eq(parent.userId, user.id))
      .where(eq(parent.id, id));
  } catch (error) {
    console.error("Failed to get parent from database");
    throw error;
  }
}
