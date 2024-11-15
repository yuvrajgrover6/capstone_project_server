import { Schema, model } from "mongoose";

interface IComment {
  id: string;
  postId: string;
  userId: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
const CommentSchema = new Schema(
  {
    id: { type: String, required: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true }
);
const CommentModel = model<IComment>("Comment", CommentSchema);
const CommentJSONSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    postId: { type: "string" },
    userId: { type: "string" },
    body: { type: "string" },
  },
  required: ["postId", "userId", "body"],
};
export { CommentModel, CommentJSONSchema };

export type { IComment };
