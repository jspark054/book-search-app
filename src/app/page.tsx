import BookSearch from "@/components/BookSearch";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-4 py-12 sm:px-8 sm:py-16">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="font-serif text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
          나만의 서재
        </h1>
        <p className="text-sm text-stone-500 sm:text-base">
          마음에 드는 책을 검색하고 나만의 서재를 채워보세요
        </p>
      </header>

      <BookSearch />
    </main>
  );
}
