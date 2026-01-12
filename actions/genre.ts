"use server";

import { connectDB } from "@/lib/db";
import Genre from "@/models/Genre";
import { revalidatePath } from "next/cache";

// Add a new Genre
export async function createGenre(name: string) {
    try {
        await connectDB();

        // Check if it already exists (case insensitive)
        const existing = await Genre.findOne({
            name: { $regex: new RegExp(`^${name}$`, "i") }
        });

        if (existing) return { success: false, error: "Genre already exists" };

        await Genre.create({ name });
        revalidatePath("/genres");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to add genre" };
    }
}

// Fetch all Genres for the 'Add Book' dropdown
export async function getAllGenres() {
    try {
        await connectDB();
        const genres = await Genre.find({}).sort({ name: 1 });
        return {
            success: true,
            data: JSON.parse(JSON.stringify(genres))
        };
    } catch (error) {
        return { success: false, error: "Failed to fetch genres" };
    }
}