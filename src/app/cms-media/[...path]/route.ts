import { NextRequest, NextResponse } from "next/server";
import { mimeFromPath, readUploadedFile } from "@/lib/cms/uploads";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: segments } = await params;
    const buffer = await readUploadedFile(segments.join("/"));
    const mime = mimeFromPath(segments.join("/"));

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
