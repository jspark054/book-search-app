import { NextRequest, NextResponse } from "next/server";

const GOOGLE_BOOKS_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json(
      { error: "검색어를 입력해주세요." },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({ q: query });
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
  if (apiKey) {
    params.set("key", apiKey);
  }

  const upstreamResponse = await fetch(`${GOOGLE_BOOKS_ENDPOINT}?${params.toString()}`);

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      { error: "Google Books API 호출에 실패했습니다." },
      { status: upstreamResponse.status }
    );
  }

  const data = await upstreamResponse.json();
  return NextResponse.json(data);
}
