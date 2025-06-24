CREATE TYPE "public"."role" AS ENUM('teacher', 'student', 'parent', 'admin', 'regional_admin', 'general_admin');--> statement-breakpoint
CREATE TABLE "ChildProgressReport" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"studentId" uuid NOT NULL,
	"teacherId" uuid NOT NULL,
	"report" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "ClassSchedule" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacherId" uuid NOT NULL,
	"studentId" uuid,
	"startTime" timestamp NOT NULL,
	"endTime" timestamp NOT NULL,
	"meetingLink" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "Parent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"parentId" varchar(20) NOT NULL,
	"registrationCompleted" boolean DEFAULT false,
	"approved" boolean DEFAULT false,
	"contactNumber" varchar(20),
	"address" text,
	"details" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "Parent_parentId_unique" UNIQUE("parentId")
);
--> statement-breakpoint
CREATE TABLE "Student" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"status" varchar(20) DEFAULT 'Improved',
	"studentId" varchar(20) NOT NULL,
	"parentId" uuid,
	"gradeLevel" varchar(20),
	"learningPreferences" text,
	"performanceHistory" json,
	"details" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "Student_studentId_unique" UNIQUE("studentId")
);
--> statement-breakpoint
CREATE TABLE "Teacher" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid,
	"teacherId" varchar(20) NOT NULL,
	"registrationCompleted" boolean DEFAULT false,
	"approved" boolean DEFAULT false,
	"isActive" boolean DEFAULT true,
	"subjects" json,
	"qualifications" json,
	"location" json,
	"details" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "Teacher_teacherId_unique" UNIQUE("teacherId")
);
--> statement-breakpoint
CREATE TABLE "TeacherStudentAssignment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"teacherId" uuid NOT NULL,
	"studentId" uuid NOT NULL,
	"subjects" json,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(64) NOT NULL,
	"password" varchar(64),
	"name" varchar(100),
	"image" varchar(255) DEFAULT '/avatar-placeholder.svg',
	"role" "role" DEFAULT 'student' NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "ChildProgressReport" ADD CONSTRAINT "ChildProgressReport_studentId_Student_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ChildProgressReport" ADD CONSTRAINT "ChildProgressReport_teacherId_Teacher_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."Teacher"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ClassSchedule" ADD CONSTRAINT "ClassSchedule_teacherId_Teacher_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."Teacher"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ClassSchedule" ADD CONSTRAINT "ClassSchedule_studentId_Student_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Parent" ADD CONSTRAINT "Parent_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Student" ADD CONSTRAINT "Student_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Student" ADD CONSTRAINT "Student_parentId_Parent_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."Parent"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TeacherStudentAssignment" ADD CONSTRAINT "TeacherStudentAssignment_teacherId_Teacher_id_fk" FOREIGN KEY ("teacherId") REFERENCES "public"."Teacher"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "TeacherStudentAssignment" ADD CONSTRAINT "TeacherStudentAssignment_studentId_Student_id_fk" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE cascade ON UPDATE no action;