import mongoose from "mongoose";

const ProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
    shelf: { type: String, enum: ["Want to Read", "Currently Reading", "Read"] },
    pagesRead: { type: Number, default: 0 },
});

export default mongoose.models.Progress || mongoose.model("Progress", ProgressSchema);