import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    focus: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    equipment: { type: [String], required: true },
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
