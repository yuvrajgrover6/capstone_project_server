import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { LikeModel, type ILike } from "../model/like_model";
import { PostModel, type IPost } from "../model/posts_model";

export default async (likeId: string) => {
  const likeDeleted: ILike | null = await LikeModel.findOneAndDelete({
    _id: likeId,
  });
  const updatedPost: IPost | null = await PostModel.findByIdAndUpdate(
    likeDeleted?.postId,
    { $inc: { like_count: -1 } },
    { new: true }
  );

  if (!likeDeleted || !updatedPost) {
    throw new BaseErrorException({
      code: 500,
      message: "Error while removing like",
      error: "ERROR_WHILE_REMOVING_LIKE",
      logInfo: { likeId },
    });
  } else {
    return new SuccessResult({
      message: "Like removed successfully",
      body: { like: likeDeleted, post: updatedPost },
      code: 200,
    });
  }
};
