import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { PaymentModel, type IPayment } from "../model/payment_model";

export default async (transaction: IPayment) => {
  if (transaction.paymentMethod == "credit_card") {
    const cardRegex =
      /^(3[47][0-9]{13}|6541[0-9]{12}|6556[0-9]{12}|389[0-9]{11}|3(?:0[0-5]|[68][0-9])[0-9]{11}|65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[01][0-9]|92[0-5])[0-9]{10}|63[7-9][0-9]{13}|(?:2131|1800|35\d{3})\d{11}|9[0-9]{15}|(6304|6706|6709|6771)[0-9]{12,15}|(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}|5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12})|(6334|6767)[0-9]{12,15}|564182[0-9]{10,13}|633110[0-9]{10,13}|62[0-9]{14,17}|4[0-9]{12}(?:[0-9]{3})?)$/;

    console.log(`Testing card number: ${transaction.paymentDetails.trim()}`);
    const check = cardRegex.test(transaction.paymentDetails.trim());
    console.log(`Card number is valid: ${check}`);

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
  const newtransaction = await PaymentModel.create(transaction);

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
