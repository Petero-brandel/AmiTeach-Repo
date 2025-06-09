import type { ReactNode } from "react";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthFooter } from "@/components/auth/auth-footer";
import { FixedIllustration } from "@/components/auth/fixed-illustration";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Left side - Fixed illustration */}
      <FixedIllustration title={title} description={description} />

      {/* Right side - Scrollable content */}
      <div className="lg:ml-[50%] min-h-screen flex flex-col">
        <AuthHeader />
        <main className="flex-1 overflow-auto mt-10">
          <div className="max-w-[500px] mx-auto p-4 lg:p-8 space-y-8">
            {children}
          </div>
        </main>
        <AuthFooter />
      </div>
    </div>
  );
}
