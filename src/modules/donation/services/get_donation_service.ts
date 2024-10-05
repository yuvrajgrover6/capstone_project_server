import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { DonationModel } from "../model/dontation_model";

export default async (id: string) => {
  const donation = await DonationModel.findOne({ id });

  if (!donation) {
    throw new BaseErrorException({
      code: 404,
      message: "Donation not found",
      error: "Not Found",
      logInfo: "Donation not found",
    });
  }

  return new SuccessResult({
    code: 200,
    message: "Donation retrieved successfully",
    body: { donation },
  });
};
