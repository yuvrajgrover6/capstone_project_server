import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import UserModel from "../../user/route/usermodel";
import { DonationModel } from "../model/dontation_model";

export default async (email: string, pageNumber: string, pageSize: string) => {
  const user = await UserModel.findOne({
    email,
  }).select("id");
  const userId = user?.id;

  const page = parseInt(pageNumber) || 1;
  const limit = parseInt(pageSize) || 10;

  const donation = await DonationModel.find({ userId })
    .limit(limit)
    .skip(limit * (page - 1))
    .sort({ createdAt: -1 });

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
