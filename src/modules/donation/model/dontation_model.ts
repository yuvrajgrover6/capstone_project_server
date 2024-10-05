import { Schema, model } from "mongoose";

interface IDonation {
  id: number;
  name: string;
  email: string;
  amount: number;
  currency: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

const DontaionSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    message: { type: String, required: true },
    userId: { type: Number, required: true },
  },
  { timestamps: true }
);

const DonationModel = model<IDonation>("Donation", DontaionSchema);

export { DonationModel };
export type { IDonation };
