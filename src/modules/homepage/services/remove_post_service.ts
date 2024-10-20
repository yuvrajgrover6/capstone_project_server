import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { type IComment, CommentModel } from "../model/comments_model";
import { LikeModel, type ILike } from "../model/like_model";
import { type IPost, PostModel } from "../model/posts_model";

export default async (postId: string) => {
  const postDeleted: IPost | null = await PostModel.findOneAndDelete({
    id: postId,
  });

  const commentDeleted = await CommentModel.deleteMany({
    postId: postId,
  });

  const likeDeleted = await LikeModel.deleteMany({
    postId: postId,
  });

  if (!postDeleted || !commentDeleted || !likeDeleted) {
    throw new BaseErrorException({
      code: 500,
      message: "Error while removing post",
      error: !postDeleted
        ? "ERROR_WHILE_REMOVING_POST"
        : "ERROR_WHILE_REMOVING_COMMENT_OR_LIKE",
      logInfo: { postId },
    });
  } else {
    return new SuccessResult({
      message: "Post removed successfully",
      body: { post: postDeleted },
      code: 200,
    });
  }
};
