import { site } from "@/lib/site";

const social = [
  { label: "Instagram", href: site.social.instagram },
  { label: "Facebook", href: site.social.facebook },
  { label: "LinkedIn", href: site.social.linkedin },
] as const;

export default function Footer() {
  const phoneHref = `tel:${site.phone.replace(/\D/g, "")}`;

  return (
    <footer className="border-t border-white/[0.08] bg-[#0c0b0a]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 lg:px-8">
        <h2 className="sr-only">Footer</h2>
        <div className="grid gap-12 sm:grid-cols-3 sm:gap-10">
          <div>
            <p className="text-sm font-medium text-white">{site.name}</p>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              10+ years in content production.
            </p>
          </div>
          <div>
            <p className="text-lg font-medium tracking-tight text-white">
              Based in Arizona.
            </p>
            <p className="mt-3 max-w-xs text-sm leading-6 text-stone-500">
              We work with brands across the country.
            </p>
            <p className="mt-3 text-sm leading-6 text-stone-500">
              Phone:{" "}
              <a
                href={phoneHref}
                className="text-white transition-colors duration-200 hover:text-stone-300"
              >
                {site.phone}
              </a>
            </p>
          </div>
          <div>
            <nav aria-label="Social" className="flex flex-col gap-2">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-500 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <p className="mt-14 border-t border-white/[0.08] pt-6 text-xs text-stone-500">
          © {new Date().getFullYear()} {site.legalName}
        </p>
      </div>
    </footer>
  );
}
