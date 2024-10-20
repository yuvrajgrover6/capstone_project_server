import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { CommentModel } from "../model/comments_model";

export default async (pageNumber: string, pageSize: string) => {
  const page = parseInt(pageNumber) || 1;
  const limit = parseInt(pageSize) || 10;

  const comments = await CommentModel.find()
    .limit(limit)
    .skip(limit * (page - 1))
    .sort({ createdAt: -1 });

  if (!comments) {
    throw new BaseErrorException({
      code: 404,
      message: "Comments not found",
      error: "Not Found",
      logInfo: "Comments not found",
    });
  }

  return new SuccessResult({
    code: 200,
    message: "Comments retrieved successfully",
    body: { comments },
  });
};
