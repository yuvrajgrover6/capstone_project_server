import { Schema, model } from "mongoose";
import type { ObjectId } from "mongoose";

interface IArtistModel {
  _id: ObjectId;
  id: string;
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  createdAt: Date;
  type: string;
}

// create mongodb schema

const ArtistSchema = new Schema(
  {
    id: String,
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
