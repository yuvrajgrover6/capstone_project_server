import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { PaymentModel, type IPayment } from "../model/payment_model";

export default async (transaction: IPayment) => {
  if (transaction.paymentMethod === "credit_card") {
    const check = transaction.paymentDetails.match(/^[0-9]{16}$/);
    if (!check) {
      throw new BaseErrorException({
        code: 400,
        message: "Invalid credit card number",
        error: "Bad Request",
        logInfo: "Invalid credit card number",
      });
    }
  } else if (transaction.paymentMethod === "paypal") {
    const check = transaction.paymentDetails.match(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    );
    if (!check) {
      throw new BaseErrorException({
        code: 400,
        message: "Invalid paypal email",
        error: "Bad Request",
        logInfo: "Invalid paypal email",
      });
    }
  }
  const newtransaction = PaymentModel.create(transaction);

  if (!newtransaction) {
    throw new BaseErrorException({
      code: 500,
      message: "Transaction not created",
      error: "Internal Server Error",
      logInfo: "Transaction not created",
    });
  }

  return new SuccessResult({
    code: 201,
    message: "Transaction created successfully",
    body: { newtransaction },
  });
};
