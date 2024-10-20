import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { LikeModel, type ILike } from "../model/like_model";
import { PostModel } from "../model/posts_model";

export default async (like: ILike) => {
  const likeCreated: ILike = await LikeModel.create(like);
  const updatedPost = await PostModel.findByIdAndUpdate(
    like.postId,
    { $inc: { like_count: 1 } },
    { new: true }
  );

  if (!likeCreated || !updatedPost) {
    throw new BaseErrorException({
      code: 500,
      message: "Error while adding like",
      error: "ERROR_WHILE_ADDING_LIKE",
      logInfo: { like },
    });
  } else {
    return new SuccessResult({
      message: "Like added successfully",
      body: { like: likeCreated, post: updatedPost },
      code: 200,
    });
  }
};
