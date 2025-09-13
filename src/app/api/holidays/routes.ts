// app/api/holidays/route.ts

// app/api/holidays/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("helo");
    const apiKey = "XWOtVtCCLltknHdxWBHO92PRUQO4wnVo";
    const url = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=IN&year=2025&year=2026`;

    const response = await fetch(url);
    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch holidays from Calendarific");
    }

    const data = await response.json();

    return NextResponse.json({ holidays: data.response.holidays });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch holidays." },
      { status: 500 }
    );
  }
}
