
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    console.log("1. API called");

    const body = await request.json();

    console.log("2. Request body:", body);

    const { food, place, date } = body;

    if (!food || !place || !date) {
      return NextResponse.json(
        {
          success: false,
          message: "Food, place and date are required",
        },
        { status: 400 }
      );
    }

    console.log("3. Connecting to MongoDB...");

    const client = await clientPromise;

    console.log("4. MongoDB connected");

    const db = client.db("dating-website");

    console.log("5. Database selected");

    const result = await db.collection("dates").insertOne({
      food: food,
      place: place,
      date: new Date(date),
      createdAt: new Date(),
    });

    console.log("6. Data inserted:", result.insertedId);

    return NextResponse.json({
      success: true,
      message: "Date saved successfully",
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("❌ SAVE DATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unknown server error",
      },
      { status: 500 }
    );
  }
}

