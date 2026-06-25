import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brandBg">
      <div className="mx-auto max-w-[1100px] px-5 py-14 md:px-12">
        <div className="grid gap-12 md:grid-cols-3 md:items-start">
          <Link
            href="/"
            className="relative block h-24 w-64 sm:h-28 sm:w-72 md:h-32 md:w-80"
          >
            <Image
              src={site.logo}
              alt={site.name}
              fill
              className="object-contain object-left"
            />
          </Link>

          <nav className="flex flex-col gap-3">
            {site.nav.map((item) =>
              "external" in item && item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-line-link w-fit text-sm"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-line-link w-fit text-sm"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex flex-col gap-3 font-body text-sm text-textMuted">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-line-link w-fit text-sm text-textMuted hover:text-brandWhite"
            >
              Instagram
            </a>
            <a
              href={`mailto:${site.email}`}
              className="nav-line-link w-fit text-sm text-textMuted hover:text-brandWhite"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="relative mt-14 pt-8">
          <div className="absolute left-0 top-0 h-px w-full max-w-md bg-white/15" />
          <p className="font-body text-xs text-white/35">
            © {new Date().getFullYear()} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
