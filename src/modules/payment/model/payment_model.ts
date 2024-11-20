import { Schema, model } from "mongoose";

interface IPayment {
  id: number;
  amount: number;
  currency: string;
  status: string;
  donationId: string;
  userId: string;
  paymentMethod: string;
  paymentDetails: string;
  created_at: Date;
  updated_at: Date;
}

const PaymentSchema = new Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    donationId: { type: String, required: true },
    userId: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentDetails: { type: String, required: true },
  },
  { timestamps: true }
);

const PaymentModel = model<IPayment>("Payment", PaymentSchema);

const PaymentJSONSchema = {
  type: "object",
  properties: {
    amount: { type: "number" },
    currency: { type: "string" },
    status: { type: "string" },
    donationId: { type: "string" },
    userId: { type: "string" },
    paymentMethod: { type: "string" },
    paymentDetails: { type: "string" },
  },
  required: ["amount", "currency", "status", "donation_id", "userId"],
};

export { PaymentModel, PaymentJSONSchema };
export type { IPayment };
