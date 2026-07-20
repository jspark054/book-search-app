import { NextRequest, NextResponse } from "next/server";

const GOOGLE_BOOKS_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";
const MAX_ATTEMPTS = 4;
const RETRY_DELAY_MS = 500;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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

  const upstreamUrl = `${GOOGLE_BOOKS_ENDPOINT}?${params.toString()}`;

  let lastResponse: Response | null = null;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const upstreamResponse = await fetch(upstreamUrl);

    if (upstreamResponse.ok) {
      const data = await upstreamResponse.json();
      return NextResponse.json(data);
    }

    lastResponse = upstreamResponse;

    // Google Books occasionally returns a transient 5xx (backendFailed) — retry those.
    const isRetryable = upstreamResponse.status >= 500;
    if (!isRetryable || attempt === MAX_ATTEMPTS) break;
    await sleep(RETRY_DELAY_MS * attempt);
  }

  console.error("Google Books API error", {
    query,
    status: lastResponse?.status,
    statusText: lastResponse?.statusText,
  });
  return NextResponse.json(
    { error: "Google Books API 호출에 실패했습니다." },
    { status: lastResponse?.status ?? 502 }
  );
}
