import { NextResponse } from "next/server";
import { MOCK_ORDERS } from "@/data/mockData";

export async function GET() {
  return NextResponse.json({ success: true, data: MOCK_ORDERS });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newOrder = {
      id: `FD${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Preparing",
      ...body
    };
    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to place order" }, { status: 400 });
  }
}
