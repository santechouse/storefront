import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const tags = searchParams.get("tags");

  if (
    process.env.REVALIDATE_SECRET &&
    secret !== process.env.REVALIDATE_SECRET
  ) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 });
  }

  const tagsArray = tags.split(",");

  await Promise.all(
    tagsArray.map(async (tag) => {
      switch (tag) {
        case "products":
          revalidatePath("/[locale]/(main)/store", "page");
          revalidatePath("/[locale]/(main)/products/[handle]", "page");
          break;
        case "collections":
          revalidatePath("/[locale]/(main)/collections/[handle]", "page");
          break;
        case "categories":
          revalidatePath("/[locale]/(main)/categories/[...category]", "page");
          break;
      }
    })
  );

  return NextResponse.json(
    { message: "Revalidated", tags: tagsArray },
    { status: 200 },
  );
}
