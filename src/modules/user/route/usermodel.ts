import { model, Schema } from "mongoose";

interface IUserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  type: string;
}

// create mongodb schema

const UserSchema = new Schema(
  {
    id: Number,
    name: String,
    email: String,
    password: String,
    photoUrl: String || null,
    createdAt: Date,
    type: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = model<IUserModel>("User", UserSchema);

export default UserModel;

export type { IUserModel };
