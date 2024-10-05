import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { DonationModel } from "../model/dontation_model";

export default async (pageNumber: string, pageSize: string) => {
  const page = parseInt(pageNumber) || 1;
  const limit = parseInt(pageSize) || 10;

  const donations = await DonationModel.find()
    .limit(limit)
    .skip(limit * (page - 1))
    .sort({ createdAt: -1 });

  if (!donations) {
    throw new BaseErrorException({
      code: 404,
      message: "Donations not found",
      error: "Not Found",
      logInfo: "Donations not found",
    });
  }

  return new SuccessResult({
    code: 200,
    message: "Donations retrieved successfully",
    body: { donations },
  });
};
