import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { DonationModel } from "../model/dontation_model";

export default async (id: string) => {
  const res = await DonationModel.deleteOne({ id });
  if (res.deletedCount === 0) {
    throw new BaseErrorException({
      code: 500,
      message: "Donation could not be deleted",
      error: "Internal Server Error",
      logInfo: "Donation could not be deleted",
    });
  } else {
    return new SuccessResult({
      code: 200,
      message: "Donation deleted successfully",
      body: { id },
    });
  }
};
