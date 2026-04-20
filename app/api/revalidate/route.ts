import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

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

type WebhookBody = {
  _type?: string;
};

export const POST = async (request: NextRequest) => {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      return NextResponse.json(
        { message: "SANITY_REVALIDATE_SECRET is not set" },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<WebhookBody>(
      request,
      secret,
      true
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    const documentType = body?._type ?? "";
    const tags = TAG_MAP[documentType];

    if (!tags) {
      return NextResponse.json(
        { message: `Unknown type: ${documentType}` },
        { status: 400 }
      );
    }

    tags.forEach((tag) => revalidateTag(tag, {}));

    return NextResponse.json({ revalidated: true, tags });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
};
