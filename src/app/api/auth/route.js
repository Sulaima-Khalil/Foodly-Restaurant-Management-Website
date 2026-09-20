import { NextResponse } from "next/server";
import { MOCK_USER } from "@/data/mockData";

export async function POST(request) {
  try {
    const { action, email, password, name } = await request.json();

    if (action === "signup") {
      const newUser = { ...MOCK_USER, name, email, role: "user" };
      return NextResponse.json({ success: true, user: newUser });
    }

    // Default login
    const isAdmin = email.toLowerCase().includes("admin");
    const user = {
      ...MOCK_USER,
      email,
      name: isAdmin ? "Admin User" : "Sulaima Khalil",
      role: isAdmin ? "admin" : "user"
    };

    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 400 });
  }
}
