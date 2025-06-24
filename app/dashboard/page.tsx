import { auth } from "../(auth)/auth";
import { redirect } from "next/navigation";
import { teacher, parent } from "@/lib/db/schema";
import { db } from "@/lib/db/queries";
import { eq } from "drizzle-orm";

export default async function Dashboard() {
  const session = await auth();
  console.log("Dashboard session:", session);

  if (!session?.user) {
    redirect("/login");
  }

  // Check for teacher onboarding
  if (session.user.role === "teacher") {
    const [teacherRecord] = await db
      .select()
      .from(teacher)
      .where(eq(teacher.userId, session.user.id as string));
    console.log("Teacher record:", teacherRecord);
    if (!teacherRecord?.registrationCompleted) {
      redirect("/teacher/onboarding/step-1");
    }
    redirect("/teacher");
  }

  // Check for parent onboarding
  if (session.user.role === "parent") {
    const [parentRecord] = await db
      .select()
      .from(parent)
      .where(eq(parent.userId, session.user.id as string));
    // If you have a registrationCompleted flag for parents, check it here
    console.log("Parent record:", parentRecord);
    if (!parentRecord?.registrationCompleted) {
      redirect("/parent/onboarding/step-1");
    }
    redirect("/parent");
  }

  if (session.user.role === "admin") {
    redirect("/admin");
  }

  // Default fallback if role is unknown
  redirect("/");
}
