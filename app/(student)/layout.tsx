import type React from "react";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { redirect } from "next/navigation";
import { auth } from "../(auth)/auth";
import { User } from "@/types";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (session.user.role !== "student") {
    redirect(`/${session.user.role}`);
  }

  return (
    <DashboardLayout user={session.user as User}>{children}</DashboardLayout>
  );
}
