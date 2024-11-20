import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { PaymentModel } from "../model/payment_model";

export default async (id: number) => {
  const deleted = await PaymentModel.deleteOne({ id: id });

  if (deleted.deletedCount === 0) {
    throw new BaseErrorException({
      code: 404,
      message: "Transaction not found",
      error: "Not Found",
      logInfo: "Transaction not found",
    });
  }

  return new SuccessResult({
    code: 200,
    message: "Transaction deleted successfully",
    body: { deleted },
  });
};
