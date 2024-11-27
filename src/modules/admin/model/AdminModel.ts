import { model, Schema } from "mongoose";

interface IAdminModel {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminModelSchema = new Schema<IAdminModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const AdminModel = model<IAdminModel>("Admin", AdminModelSchema);

export default AdminModel;
export type { IAdminModel };
