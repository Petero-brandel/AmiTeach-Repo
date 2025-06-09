import Link from "next/link";
import { LanguageSelector } from "../home/language-selector";

export function AuthHeader() {
  return (
    <header className="flex items-center justify-between p-4 lg:p-6 border-b lg:border-none">
      <Link href="/" className="text-xl font-bold lg:hidden">
        AMI Education
      </Link>
      <div className="ml-auto">
        <LanguageSelector />
      </div>
    </header>
  );
}
