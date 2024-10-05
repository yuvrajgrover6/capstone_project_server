import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { DonationModel, type IDonation } from "../model/dontation_model";

export default async (idonation: IDonation) => {
  const donation = await DonationModel.create(idonation);
  if (!donation) {
    throw new BaseErrorException({
      code: 500,
      message: "Donation could not be created",
      error: "Internal Server Error",
      logInfo: "Donation could not be created",
    });
  } else {
    return new SuccessResult({
      code: 201,
      message: "Donation created successfully",
      body: { donation },
    });
  }
};
