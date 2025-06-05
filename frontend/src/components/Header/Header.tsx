import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex justify-center pt-15 pb-10">
      <div className="w-8/9 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="relative w-15 h-15">
            <Image
              src="/images/main-logo.png"
              alt="DDALKKAK"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-4xl font-bold">DDALKKAK</span>
        </Link>
      </div>
    </header>
  );
}
