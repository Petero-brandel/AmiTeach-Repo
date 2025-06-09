import { auth } from "@/app/(auth)/auth";
import { redirect } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const session = await auth();

  // Check if user is authenticated
  if (!session || !session.user) {
    // User is not logged in, redirect to home page
    redirect("/");
  }

  // Use type assertion to tell TypeScript about the role property
  const user = session.user;

  // Redirect based on user role
  if (user.role === "teacher") {
    redirect("/teacher");
  } else if (user.role === "parent") {
    redirect("/parent");
  } else if (user.role === "student") {
    redirect("/student");
  } else {
    // Handle unknown role or default case
    redirect("/"); // Fallback to a general dashboard
  }
}
