import { Schema, model } from "mongoose";

interface ILike {
  id: string;
  postId: string;
  userId: string;
}

const LikeSchema = new Schema(
  {
    id: { type: String, required: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const LikeModel = model<ILike>("Like", LikeSchema);

const LikeJSONSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    postId: { type: "string" },
    userId: { type: "string" },
  },
  required: ["postId", "userId"],
};

export { LikeModel, LikeJSONSchema };

export type { ILike };
