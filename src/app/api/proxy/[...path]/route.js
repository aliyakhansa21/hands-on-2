import { NextResponse } from "next/server";

const EXTERNAL_API = process.env.API_URL;

// Catch-all proxy route: /api/proxy/[...path]
export async function GET(request, context) {
  if (!EXTERNAL_API) {
    return NextResponse.json(
      { error: "API_URL environment variable is not configured." },
      { status: 500 }
    );
  }

  const params = await context.params;
  const pathSegments = params?.path ?? [];
  const apiPath = "/" + pathSegments.join("/");

  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  const targetUrl = `${EXTERNAL_API}${apiPath}${queryString ? `?${queryString}` : ""}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    if (!response.ok) {
      const body = isJson ? await response.json() : await response.text();
      return NextResponse.json(
        { error: body?.message ?? `Upstream error ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Proxy request failed." },
      { status: 502 }
    );
  }
}
