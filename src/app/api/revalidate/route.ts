import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const tags = searchParams.get("tags")

  if (!tags) {
    return NextResponse.json({ error: "No tags provided" }, { status: 400 })
  }

  const tagsArray = tags.split(",")

  tagsArray.forEach((tag) => {
    revalidateTag(tag, {})
  })

  return NextResponse.json(
    { message: "Revalidated", tags: tagsArray },
    { status: 200 }
  )
}
