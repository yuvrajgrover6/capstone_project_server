import { Schema, model } from "mongoose";

interface IArtistModel {
  id: number;
  name: string;
  email: string;
  password: string;
  photoUrl: string;
  createdAt: Date;
  type: string;
}

// create mongodb schema

const ArtistSchema = new Schema(
  {
    id: Number,
    name: String,
    email: String,
    password: String,
    photoUrl: String,
    createdAt: Date,
    type: String,
  },
  {
    timestamps: true,
  }
);

const ArtistModel = model<IArtistModel>("Artist", ArtistSchema);

export default ArtistModel;
export type { IArtistModel };
