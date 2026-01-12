"use server";

import { connectDB } from "@/lib/db";
import Book from "@/models/Book";
import Genre from "@/models/Genre"; // Must import Genre for .populate()
import { revalidatePath } from "next/cache";

export async function createBook(data: any) {
    try {
        await connectDB();
        await Book.create(data);
        revalidatePath("/manage-books");
        return { success: true };
    } catch (err) {
        return { success: false };
    }
}

export async function getAllBooks() {
    try {
        await connectDB();
        // .populate("genre") grabs the name from the Genre model automatically
        const books = await Book.find().populate("genre").sort({ createdAt: -1 });
        return { success: true, data: JSON.parse(JSON.stringify(books)) };
    } catch (err) {
        return { success: false, data: [] };
    }
}

export async function deleteBook(id: string) {
    try {
        await connectDB();
        await Book.findByIdAndDelete(id);
        revalidatePath("/manage-books");
        return { success: true };
    } catch (err) {
        return { success: false };
    }
}