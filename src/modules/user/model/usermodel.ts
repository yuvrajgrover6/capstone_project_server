import { model, Schema } from "mongoose";

interface IUserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  type: string;
}

// create mongodb schema

const UserSchema = new Schema(
  {
    id: String,
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

const UserModel = model<IUserModel>("artist", UserSchema);

export default UserModel;

export type { IUserModel };
