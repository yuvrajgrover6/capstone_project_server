import { Schema, model } from "mongoose";

interface IPost {
  id: string;
  title: string;
  body: string;
  artistId: string;
  like_count: number;
  comment_count: number;
  imageUrl?: string;
  isReported?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    artistId: { type: String, required: true },
    like_count: { type: Number, required: true },
    comment_count: { type: Number, required: true },
    imageUrl: { type: String },
    isReported: { type: Boolean },
  },
  { timestamps: true }
);

const PostModel = model<IPost>("Post", PostSchema);

const PostJSONSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    body: { type: "string" },
    artistId: { type: "string" },
  },
  required: ["title", "body", "artistId"],
};

export { PostModel, PostJSONSchema };
export type { IPost };
