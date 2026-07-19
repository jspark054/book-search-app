export type Book = {
  id: string;
  title: string;
  subtitle: string | null;
  authors: string[];
  description: string | null;
  thumbnail: string | null;
  publisher: string | null;
  publishedDate: string | null;
  pageCount: number | null;
  categories: string[];
  averageRating: number | null;
  ratingsCount: number | null;
  infoLink: string | null;
  previewLink: string | null;
};

export type GoogleVolumeItem = {
  id: string;
  volumeInfo?: {
    title?: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
    ratingsCount?: number;
    infoLink?: string;
    previewLink?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
};

const toHttps = (url: string | undefined | null) =>
  url ? url.replace("http://", "https://") : null;

export function toBook(item: GoogleVolumeItem): Book {
  const info = item.volumeInfo ?? {};
  const thumbnail = info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail ?? null;

  return {
    id: item.id,
    title: info.title ?? "제목 정보 없음",
    subtitle: info.subtitle ?? null,
    authors: info.authors ?? [],
    description: info.description ?? null,
    thumbnail: toHttps(thumbnail),
    publisher: info.publisher ?? null,
    publishedDate: info.publishedDate ?? null,
    pageCount: info.pageCount ?? null,
    categories: info.categories ?? [],
    averageRating: info.averageRating ?? null,
    ratingsCount: info.ratingsCount ?? null,
    infoLink: toHttps(info.infoLink),
    previewLink: toHttps(info.previewLink),
  };
}
