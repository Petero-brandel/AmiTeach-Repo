import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex gap-4 w-full mx-auto justify-center items-center min-h-screen">
      <Link href="/register">
        <Button>Register</Button>
      </Link>
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
