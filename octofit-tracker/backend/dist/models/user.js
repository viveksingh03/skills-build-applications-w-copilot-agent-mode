import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    fitnessGoal: { type: String, required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
