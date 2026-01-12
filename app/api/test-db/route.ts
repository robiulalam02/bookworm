import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();

        // 1. Try to count users (even if 0, it confirms connection)
        const userCount = await User.countDocuments();

        return NextResponse.json({
            message: "✅ MongoDB Atlas is connected!",
            databaseStatus: "Connected",
            currentUsersInDB: userCount
        });
    } catch (error: any) {
        return NextResponse.json({
            message: "❌ Connection Failed",
            error: error.message
        }, { status: 500 });
    }
}