"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { User } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar user={user} />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 p-6 bg-gray-50"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
}
