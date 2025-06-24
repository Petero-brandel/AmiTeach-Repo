import { relations, type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  varchar,
  uuid,
  timestamp,
  pgEnum,
  boolean,
  json,
  text,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", [
  "teacher",
  "student",
  "parent",
  "admin",
  "regional_admin",
  "general_admin",
]);

export type UserRole = "teacher" | "student" | "parent" | "admin";

export const user = pgTable("User", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  email: varchar("email", { length: 64 }).notNull().unique(),
  password: varchar("password", { length: 64 }),
  name: varchar("name", { length: 100 }),
  image: varchar("image", { length: 255 }).default("/avatar-placeholder.svg"),
  role: roleEnum("role").default("student").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type User = InferSelectModel<typeof user>;

export const teacher = pgTable("Teacher", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("userId").references(() => user.id, { onDelete: "cascade" }),
  teacherId: varchar("teacherId", { length: 20 }).notNull().unique(),
  registrationCompleted: boolean("registrationCompleted").default(false),
  approved: boolean("approved").default(false),
  isActive: boolean("isActive").default(true),
  subjects: json("subjects"),
  qualifications: json("qualifications"),
  location: json("location"), // For GPS coordinates
  details: json("details"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Teacher = InferSelectModel<typeof teacher>;

export const student = pgTable("Student", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("userId").references(() => user.id, { onDelete: "cascade" }),
  status: varchar("status", { length: 20 }).default("Improved"),
  studentId: varchar("studentId", { length: 20 }).notNull().unique(),
  parentId: uuid("parentId").references(() => parent.id),
  gradeLevel: varchar("gradeLevel", { length: 20 }),
  learningPreferences: text("learningPreferences"),
  performanceHistory: json("performanceHistory"),
  details: json("details"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Student = InferSelectModel<typeof student>;

export const parent = pgTable("Parent", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("userId").references(() => user.id, { onDelete: "cascade" }),
  parentId: varchar("parentId", { length: 20 }).notNull().unique(),
  registrationCompleted: boolean("registrationCompleted").default(false),
  approved: boolean("approved").default(false),
  contactNumber: varchar("contactNumber", { length: 20 }),
  address: text("address"),
  details: json("details"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Parent = InferSelectModel<typeof parent>;

export const teacherStudentAssignment = pgTable("TeacherStudentAssignment", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  teacherId: uuid("teacherId")
    .references(() => teacher.id, { onDelete: "cascade" })
    .notNull(),
  studentId: uuid("studentId")
    .references(() => student.id, { onDelete: "cascade" })
    .notNull(),
  subjects: json("subjects"), // Subject for the assignment
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type TeacherStudentAssignment = InferSelectModel<
  typeof teacherStudentAssignment
>;

export const classSchedule = pgTable("ClassSchedule", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  teacherId: uuid("teacherId")
    .references(() => teacher.id, { onDelete: "cascade" })
    .notNull(),
  studentId: uuid("studentId").references(() => student.id, {
    onDelete: "cascade",
  }),
  startTime: timestamp("startTime").notNull(),
  endTime: timestamp("endTime").notNull(),
  meetingLink: varchar("meetingLink", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type ClassSchedule = InferSelectModel<typeof classSchedule>;

export const childProgressReport = pgTable("ChildProgressReport", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  studentId: uuid("studentId")
    .references(() => student.id, { onDelete: "cascade" })
    .notNull(),
  teacherId: uuid("teacherId")
    .references(() => teacher.id, { onDelete: "cascade" })
    .notNull(),
  report: text("report").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type ChildProgressReport = InferSelectModel<typeof childProgressReport>;
