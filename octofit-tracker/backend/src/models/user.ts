import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  fitnessGoal: string;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  fitnessGoal: { type: String, required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });

export const User = mongoose.model<IUser>('User', userSchema);
