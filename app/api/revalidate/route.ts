import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

const TAG_MAP: Record<string, string[]> = {
  homePage: ["homepage"],
  aboutPage: ["about"],
  contactPage: ["contact"],
  joinPage: ["join"],
  siteSettings: ["siteSettings"],
  article: ["articles"],
  event: ["events"],
  member: ["members"],
  testimonial: ["testimonials"],
};

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-webhook-secret");

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 }
    );
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json();
  const documentType: string = body?._type ?? "";
  const tags = TAG_MAP[documentType];

  if (!tags) {
    return NextResponse.json(
      { message: `Unknown type: ${documentType}` },
      { status: 400 }
    );
  }

  tags.forEach((tag) => revalidateTag(tag, {}));

  return NextResponse.json({ revalidated: true, tags });
}
