import { Schema, model } from "mongoose";

interface IReportPost {
  id: string;
  postId: string;
  userId: string;
  reason: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReportPostSchema = new Schema(
  {
    id: { type: String, required: true },
    postId: { type: String, required: true },
    userId: { type: String, required: true },
    reason: { type: String, required: true },
  },
  { timestamps: true }
);

const ReportPostModel = model<IReportPost>("ReportPost", ReportPostSchema);

export { ReportPostModel };

export type { IReportPost };
