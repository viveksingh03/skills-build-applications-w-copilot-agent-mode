import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
export const Team = mongoose.model('Team', teamSchema);
