import mongoose, { Schema, models, model } from "mongoose";

const GenreSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true 
  },
}, { timestamps: true });

export default models.Genre || model("Genre", GenreSchema);