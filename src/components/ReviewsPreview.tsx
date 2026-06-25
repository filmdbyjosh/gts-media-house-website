import LineButton from "@/components/LineButton";
import { site } from "@/lib/site";

function GoogleIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="#38B6FF"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#38B6FF"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#38B6FF"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      />
      <path
        fill="#38B6FF"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function StarRating() {
  return (
    <div
      className="flex items-center gap-0.5 text-[#FBBC04]"
      aria-label={`${site.reviews.rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPreview() {
  return (
    <div className="list-row border-b-0 pb-12">
      <div className="mx-auto max-w-[1100px] px-5 md:px-12">
        <article className="max-w-xl border border-white/10 bg-white/[0.02] p-8 md:p-10">
          <div className="mb-6 flex items-center gap-2">
            <StarRating />
            <span className="font-body text-sm font-semibold text-brandWhite">
              {site.reviews.rating.toFixed(1)}
            </span>
          </div>

          <blockquote className="font-body text-base leading-relaxed text-white/85 italic md:text-lg">
            &ldquo;{site.reviews.featuredQuote}&rdquo;
          </blockquote>
        </article>

        <div className="mt-8 flex max-w-xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <GoogleIcon />
            <p className="font-body text-xs uppercase tracking-[0.16em] text-textMuted">
              Google Reviews
            </p>
          </div>

          <LineButton href={site.social.googleReviews}>
            See all reviews
          </LineButton>
        </div>
      </div>
    </div>
  );
}
