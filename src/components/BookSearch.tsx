"use client";

import { useState, type FormEvent } from "react";
import BookCard from "./BookCard";
import BookDetailModal from "./BookDetailModal";
import { toBook, type Book, type GoogleVolumeItem } from "@/lib/types";

type Status = "idle" | "loading" | "error";

export default function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    setStatus("loading");
    setHasSearched(true);

    try {
      const response = await fetch(`/api/books?q=${encodeURIComponent(trimmed)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "검색 중 오류가 발생했습니다.");
      }

      const items: GoogleVolumeItem[] = data.items ?? [];
      setBooks(items.map(toBook));
      setStatus("idle");
    } catch (error) {
      setBooks([]);
      setErrorMessage(
        error instanceof Error ? error.message : "검색 중 오류가 발생했습니다."
      );
      setStatus("error");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <BookDetailModal
        book={selectedBook}
        index={selectedIndex}
        onClose={() => setSelectedBook(null)}
      />

      <form
        onSubmit={handleSearch}
        className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="책 제목이나 저자를 입력하세요"
          className="w-full rounded-full border border-stone-200 bg-white/90 px-5 py-3 text-sm text-stone-700 shadow-card outline-none placeholder:text-stone-400 focus:border-blush-300 focus:ring-2 focus:ring-blush-200"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="shrink-0 rounded-full bg-blush-300 px-6 py-3 text-sm font-medium text-white shadow-card transition-colors hover:bg-blush-400 focus:outline-none focus:ring-2 focus:ring-blush-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          검색
        </button>
      </form>

      <section>
        {status === "loading" && (
          <div className="flex flex-col items-center gap-3 py-10 text-stone-500">
            <span
              className="h-8 w-8 animate-spin rounded-full border-2 border-blush-300 border-t-transparent"
              aria-hidden
            />
            <p className="text-sm">검색하는 중이에요...</p>
          </div>
        )}

        {status === "error" && (
          <p className="mx-auto max-w-sm text-center text-sm text-red-500">
            {errorMessage}
          </p>
        )}

        {status === "idle" && hasSearched && books.length === 0 && (
          <p className="mx-auto max-w-sm text-center text-sm text-stone-500">
            검색 결과가 없습니다.
          </p>
        )}

        {status === "idle" && !hasSearched && (
          <p className="mx-auto max-w-sm text-center text-sm text-stone-400">
            책 제목이나 저자를 검색해보세요.
          </p>
        )}

        {status === "idle" && books.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                index={index}
                onClick={() => {
                  setSelectedBook(book);
                  setSelectedIndex(index);
                }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
