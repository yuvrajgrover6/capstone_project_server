import { Schema, model } from "mongoose";

interface IComment {
  id: string;
  postId: number;
  userId: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
const CommentSchema = new Schema(
  {
    id: { type: String, required: true },
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
    id: { type: "string" },
    postId: { type: "number" },
    userId: { type: "number" },
    body: { type: "string" },
  },
  required: ["postId", "userId", "body"],
};
export { CommentModel, CommentJSONSchema };

export type { IComment };
