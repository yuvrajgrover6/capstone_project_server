import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { PaymentModel } from "../model/payment_model";

export default async (userId: string) => {
  const transactions = await PaymentModel.find({ userId });

  if (!transactions) {
    throw new BaseErrorException({
      code: 404,
      message: "Transactions not found",
      error: "Not Found",
      logInfo: "Transactions not found",
    });
  }

  return new SuccessResult({
    code: 200,
    message: "Transactions retrieved successfully",
    body: { transactions },
  });
};
