import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import ArtistModel from "../../user/model/usermodel";

export default async (userId: string) => {
  const user = await ArtistModel.findByIdAndDelete(userId);
  if (!user) {
    throw new BaseErrorException({
      code: 404,
      error: "No user found",
      message: "No user found",
      logInfo: {},
    });
  }

  return new SuccessResult({
    message: "User deleted successfully",
    body: { user },
    code: 200,
  });
};
