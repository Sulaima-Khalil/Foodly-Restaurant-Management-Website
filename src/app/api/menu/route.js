import { NextResponse } from "next/server";
import { MOCK_MENU_ITEMS } from "@/data/mockData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");
  const category = searchParams.get("category");

  let items = [...MOCK_MENU_ITEMS];

  if (restaurantId) {
    items = items.filter((i) => i.restaurantId === restaurantId);
  }

  if (category && category !== "All") {
    items = items.filter((i) => i.category.toLowerCase() === category.toLowerCase());
  }

  return NextResponse.json({ success: true, data: items });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newItem = {
      id: `m${Date.now()}`,
      status: "Active",
      ...body
    };
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}
