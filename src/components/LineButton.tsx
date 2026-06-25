import Link from "next/link";

type LineButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

export default function LineButton({
  children,
  onClick,
  href,
  className = "",
}: LineButtonProps) {
  const inner = (
    <>
      <span>{children}</span>
      <span className="btn-line-arrow" aria-hidden="true">
        <span className="btn-line-arrow-inner">→</span>
      </span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-line ${className}`}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={`btn-line ${className}`}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`btn-line ${className}`}>
      {inner}
    </button>
  );
}
