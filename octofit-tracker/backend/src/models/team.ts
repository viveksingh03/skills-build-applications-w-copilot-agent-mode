import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  description: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export const Team = mongoose.model<ITeam>('Team', teamSchema);
