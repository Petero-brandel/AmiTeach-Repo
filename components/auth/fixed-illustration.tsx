import Image from "next/image";
import Link from "next/link";

interface FixedIllustrationProps {
  title: string;
  description: string;
}

export function FixedIllustration({
  title,
  description,
}: FixedIllustrationProps) {
  return (
    <div className="hidden lg:block fixed left-0 w-1/2 h-screen">
      <div className="absolute inset-0">
        <Image
          src="/A classic oil painting depicting a 3D illustration of an African child with curly hair, joyf.jpg"
          alt="African education illustration"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 h-[80%] pt-6 flex flex-col justify-between p-6">
        <Link href="/" className="text-xl font-bold text-white">
          AMI Education
        </Link>
        <div className="space-y-4 max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{title}</h1>
          <p className="text-lg text-white/90">{description}</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/90">
          <Link href="/help" className="hover:text-white">
            Help Center
          </Link>
          <Link href="/terms" className="hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
}
