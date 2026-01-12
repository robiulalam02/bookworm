import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
    totalPages: { type: Number },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model("Book", BookSchema);