"use server";

import { connectDB } from "@/lib/db";
import Genre from "@/models/Genre";
import { revalidatePath } from "next/cache";

// Action to create a new genre
export async function createGenre(name: string) {
    try {
        await connectDB();

        const existing = await Genre.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
        if (existing) return { success: false, error: "This genre already exists." };

        await Genre.create({ name });

        revalidatePath("/genres"); // Refresh the admin genre list
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create genre." };
    }
}

// Action to fetch all genres for the "Add Book" dropdown
export async function getAllGenres() {
    try {
        await connectDB();
        const genres = await Genre.find({}).sort({ name: 1 });
        return { success: true, data: JSON.parse(JSON.stringify(genres)) };
    } catch (error) {
        return { success: false, error: "Failed to fetch genres." };
    }
}