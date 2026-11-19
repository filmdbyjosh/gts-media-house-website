import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StrokeTitle from "@/components/StrokeTitle";

type PageShellProps = {
  lines: readonly { before: string; emphasis: string }[];
  subtitle?: string;
  children: React.ReactNode;
};

export function PageShell({ lines, subtitle, children }: PageShellProps) {
  return (
    <>
      <Header />
      <main className="relative z-10 min-h-screen bg-brandBg">
        <section className="border-b border-borderSoft">
          <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-12 md:py-20">
            <StrokeTitle lines={lines} />
            {subtitle ? (
              <p className="mt-8 max-w-2xl font-body text-base leading-relaxed text-textMuted md:text-lg">
                {subtitle}
              </p>
            ) : null}
          </div>
        </section>
        {children}
        <Footer />
      </main>
    </>
  );
}
