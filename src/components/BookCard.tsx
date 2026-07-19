import type { KeyboardEvent } from "react";
import type { Book } from "@/lib/types";
import { pickPlaceholderGradient } from "@/lib/placeholderGradients";

export default function BookCard({
  book,
  index = 0,
  onClick,
}: {
  book: Book;
  index?: number;
  onClick?: () => void;
}) {
  const gradient = pickPlaceholderGradient(index);
  const authorText = book.authors.length > 0 ? book.authors.join(", ") : "저자 미상";

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white/80 shadow-card ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-blush-300"
    >
      {book.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={book.thumbnail}
          alt={`${book.title} 표지`}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div
          className={`flex h-48 items-center justify-center bg-gradient-to-br ${gradient} text-5xl`}
        >
          <span aria-hidden>📘</span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-serif text-lg font-semibold text-stone-800">
          {book.title}
        </h3>
        <p className="text-sm font-medium text-blush-400">{authorText}</p>
        <p className="line-clamp-3 text-sm leading-relaxed text-stone-500">
          {book.description ?? "설명이 제공되지 않습니다."}
        </p>
      </div>
    </div>
  );
}
