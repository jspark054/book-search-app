export type Book = {
  id: string;
  title: string;
  authors: string[];
  description: string;
  thumbnail: string | null;
};

export type GoogleVolumeItem = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
  };
};

export function toBook(item: GoogleVolumeItem): Book {
  const info = item.volumeInfo ?? {};
  const thumbnail = info.imageLinks?.thumbnail ?? info.imageLinks?.smallThumbnail ?? null;

  return {
    id: item.id,
    title: info.title ?? "제목 정보 없음",
    authors: info.authors ?? [],
    description: info.description ?? "설명이 제공되지 않습니다.",
    thumbnail: thumbnail ? thumbnail.replace("http://", "https://") : null,
  };
}
