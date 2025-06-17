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
  isActive: boolean("isActive").default(true),
  hourlyRate: varchar("hourlyRate", { length: 10 }),
  subjects: json("subjects"),
  qualifications: text("qualifications"),
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
  subject: varchar("subject", { length: 50 }).notNull(), // Subject for the assignment
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

export const studyMaterial = pgTable("StudyMaterial", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  teacherId: uuid("teacherId")
    .references(() => teacher.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  fileUrl: varchar("fileUrl", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type StudyMaterial = InferSelectModel<typeof studyMaterial>;

export const quiz = pgTable("Quiz", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  teacherId: uuid("teacherId")
    .references(() => teacher.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Quiz = InferSelectModel<typeof quiz>;

export const quizResult = pgTable("QuizResult", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  quizId: uuid("quizId")
    .references(() => quiz.id, { onDelete: "cascade" })
    .notNull(),
  studentId: uuid("studentId")
    .references(() => student.id, { onDelete: "cascade" })
    .notNull(),
  score: varchar("score", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type QuizResult = InferSelectModel<typeof quizResult>;

export const payment = pgTable("Payment", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  parentId: uuid("parentId")
    .references(() => parent.id, { onDelete: "cascade" })
    .notNull(),
  amount: varchar("amount", { length: 20 }).notNull(),
  status: varchar("status", { length: 20 }).default("Pending"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});

export type Payment = InferSelectModel<typeof payment>;

export const notification = pgTable("Notification", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  userId: uuid("userId")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Notification = InferSelectModel<typeof notification>;

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
