import { Schema, model } from "mongoose";

interface IPayment {
  id: number;
  amount: number;
  currency: string;
  status: string;
  donation_id: string;
  created_at: Date;
  updated_at: Date;
}

const PaymentSchema = new Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
    donation_id: { type: String, required: true },
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
    donation_id: { type: "string" },
  },
  required: ["amount", "currency", "status", "donation_id"],
};

export { PaymentModel, PaymentJSONSchema };
export type { IPayment };
