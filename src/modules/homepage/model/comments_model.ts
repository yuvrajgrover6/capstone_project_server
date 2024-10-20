import { Schema, model } from "mongoose";

interface IComment {
  id: number;
  postId: number;
  userId: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
const CommentSchema = new Schema(
  {
    postId: { type: Number, required: true },
    userId: { type: Number, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);
const CommentModel = model<IComment>("Comment", CommentSchema);
const CommentJSONSchema = {
  type: "object",
  properties: {
    postId: { type: "number" },
    userId: { type: "number" },
    body: { type: "string" },
  },
  required: ["postId", "userId", "body"],
};
export { CommentModel, CommentJSONSchema };

export type { IComment };
