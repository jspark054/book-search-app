"use client";

import { useEffect } from "react";
import type { Book } from "@/lib/types";
import { pickPlaceholderGradient } from "@/lib/placeholderGradients";

function StarRating({ rating, count }: { rating: number; count: number | null }) {
  const filled = Math.round(rating);

  return (
    <div className="flex items-center gap-1.5 text-sm text-stone-600">
      <span className="flex text-blush-400" aria-hidden>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < filled ? "★" : "☆"}</span>
        ))}
      </span>
      <span className="font-medium">{rating.toFixed(1)}</span>
      {count != null && (
        <span className="text-stone-400">({count.toLocaleString()}명)</span>
      )}
    </div>
  );
}

export default function BookDetailModal({
  book,
  index = 0,
  onClose,
}: {
  book: Book | null;
  index?: number;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!book) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [book, onClose]);

  if (!book) return null;

  const gradient = pickPlaceholderGradient(index);
  const largeCover = book.thumbnail?.replace(/zoom=\d/, "zoom=3") ?? null;
  const metaParts = [
    book.publisher,
    book.publishedDate,
    book.pageCount ? `${book.pageCount}쪽` : null,
  ].filter((part): part is string => Boolean(part));
  const linkHref = book.infoLink ?? book.previewLink;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="animate-modal-in relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-cream-50 shadow-soft sm:max-w-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-500 shadow-card transition-colors hover:bg-white hover:text-stone-700"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden>
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="max-h-[85vh] overflow-y-auto">
          {largeCover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={largeCover}
              alt={`${book.title} 표지`}
              className="h-64 w-full object-cover sm:h-72"
            />
          ) : (
            <div
              className={`flex h-64 items-center justify-center bg-gradient-to-br ${gradient} text-7xl sm:h-72`}
            >
              <span aria-hidden>📘</span>
            </div>
          )}

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex flex-col gap-1">
              <h2
                id="book-modal-title"
                className="font-serif text-2xl font-bold leading-snug text-stone-800"
              >
                {book.title}
              </h2>
              {book.subtitle && (
                <p className="text-base text-stone-500">{book.subtitle}</p>
              )}
              {book.authors.length > 0 && (
                <p className="text-sm font-medium text-blush-400">
                  {book.authors.join(", ")}
                </p>
              )}
            </div>

            {book.averageRating != null && (
              <StarRating rating={book.averageRating} count={book.ratingsCount} />
            )}

            {metaParts.length > 0 && (
              <p className="text-sm text-stone-500">{metaParts.join(" · ")}</p>
            )}

            {book.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-stone-600"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {book.description && (
              <p className="whitespace-pre-line text-sm leading-relaxed text-stone-600">
                {book.description}
              </p>
            )}

            {linkHref && (
              <a
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-blush-300 px-5 py-2.5 text-sm font-medium text-white shadow-card transition-colors hover:bg-blush-400"
              >
                Google Books에서 보기
                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden>
                  <path
                    d="M7 4h9v9M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
