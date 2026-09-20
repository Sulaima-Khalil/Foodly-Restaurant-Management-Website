import { NextResponse } from "next/server";
import { MOCK_RESTAURANTS } from "@/data/mockData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cuisine = searchParams.get("cuisine");
  const search = searchParams.get("search");

  let filtered = [...MOCK_RESTAURANTS];

  if (cuisine && cuisine !== "All") {
    filtered = filtered.filter(
      (r) => r.cuisine.toLowerCase() === cuisine.toLowerCase()
    );
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({ success: true, data: filtered });
}
