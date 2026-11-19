import Image from "next/image";
import Link from "next/link";
import ApplyButton from "@/components/ApplyButton";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#1c1917]/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
        <div className="min-w-0">
          <Link href="/" className="inline-block">
            <Image
              src={site.logoLight}
              alt={site.name}
              width={168}
              height={60}
              priority
              className="h-11 w-auto sm:h-12"
            />
          </Link>
          <p className="mt-2 max-w-[11rem] text-[11px] leading-4 text-stone-500 sm:max-w-none">
            10+ years in content production.
          </p>
        </div>
        <ApplyButton className="shrink-0" />
      </div>
    </header>
  );
}
