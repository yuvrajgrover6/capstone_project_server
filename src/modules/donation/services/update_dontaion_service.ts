import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { DonationModel, type IDonation } from "../model/dontation_model";

export default async (idonation: IDonation) => {
  const newDonation = await DonationModel.findOneAndUpdate(
    { id: idonation.id },
    idonation,
    { new: true }
  );

  if (!newDonation) {
    throw new BaseErrorException({
      code: 500,
      message: "Donation could not be updated",
      error: "Internal Server Error",
      logInfo: "Donation could not be updated",
    });
  }

  return new SuccessResult({
    code: 200,
    message: "Donation updated successfully",
    body: { newDonation },
  });
};
