import { SuccessResult } from "../../../core/response_handlers/success_response";
import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import UserModel from "../model/usermodel";

export default async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new BaseErrorException({
      code: 404,
      error: "User not found",
      message: "USER_NOT_FOUND",
      logInfo: { userId },
    });
  }

  return new SuccessResult({
    code: 200,
    message: "User details",
    body: { user },
  });
};
