import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { PostModel } from "../model/posts_model";
import { ReportPostModel, type IReportPost } from "../model/report_post";

export default async (reportPost: IReportPost) => {
  const reported = await ReportPostModel.create(reportPost);
  const updatedPost = await PostModel.findByIdAndUpdate(reportPost.postId, {
    isReported: true,
  });
  if (!reported || !updatedPost) {
    throw new BaseErrorException({
      code: 400,
      error: "Failed to report post",
      message: "Failed to report post",
      logInfo: {},
    });
  }
  return new SuccessResult({
    message: "Post reported successfully",
    body: { reported },
    code: 200,
  });
};
