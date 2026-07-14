import mongoose, { Schema } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
}, { timestamps: true });
export const Activity = mongoose.model('Activity', activitySchema);
