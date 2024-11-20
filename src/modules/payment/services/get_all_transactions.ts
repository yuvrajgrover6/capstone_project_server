import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { PaymentModel } from "../model/payment_model";

export default async (pageNumber: string, pageSize: string) => {
  const page = parseInt(pageNumber) || 1;
  const limit = parseInt(pageSize) || 10;

  const transactions = await PaymentModel.find()
    .limit(limit)
    .skip(limit * (page - 1))
    .sort({ createdAt: -1 });

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
