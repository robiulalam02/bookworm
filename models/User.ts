import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photo: { type: String }, // ImgBB URL
    role: { type: String, enum: ["admin", "user"], default: "user" },
    // For the Extra Complexity: Annual Goal
    readingGoal: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);