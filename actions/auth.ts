"use server"; // 👈 This is the most important line! It tells Next.js this runs on the server.

import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(userData: any) {
    try {
        // 1. Connect to MongoDB Atlas
        await connectDB();

        const { name, email, password, photo } = userData;

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { success: false, error: "User already registered with this email." };
        }

        // 3. Hash the password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create the user in Atlas
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            photo, // This will be the ImgBB URL you get from the frontend
            role: "user", // Default role
        });

        await newUser.save();

        return { success: true };
    } catch (error: any) {
        console.error("Registration Error:", error);
        return { success: false, error: "Database error. Please try again." };
    }
}