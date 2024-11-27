import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import UserModel from "../../user/model/usermodel";

export default async (pageNumber: string, pageSize: string) => {
  const page = parseInt(pageNumber) || 1;
  const limit = parseInt(pageSize) || 10;

  const users = await UserModel.find()
    .limit(limit)
    .skip(limit * (page - 1));

  if (!users) {
    throw new BaseErrorException({
      code: 404,
      error: "No users found",
      message: "No users found",
      logInfo: {},
    });
  }

  return new SuccessResult({
    message: "Users found successfully",
    body: { users },
    code: 200,
  });
};
