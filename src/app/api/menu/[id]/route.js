import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: `Menu item ${id} updated`,
      data: { id, ...body }
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update item" }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    return NextResponse.json({
      success: true,
      message: `Menu item ${id} deleted`
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete item" }, { status: 400 });
  }
}
