import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { CommentModel, type IComment } from "../model/comments_model";
import { PostModel, type IPost } from "../model/posts_model";

export default async (commentId: string) => {
  const commentDeleted: IComment | null = await CommentModel.findOneAndDelete({
    id: commentId,
  });
  const updatedPost: IPost | null = await PostModel.findByIdAndUpdate(
    commentDeleted?.postId,
    { $inc: { comment_count: -1 } },
    { new: true }
  );

  if (!commentDeleted || !updatedPost) {
    throw new BaseErrorException({
      code: 500,
      message: "Error while removing comment",
      error: "ERROR_WHILE_REMOVING_COMMENT",
      logInfo: { commentId },
    });
  } else {
    return new SuccessResult({
      message: "Comment removed successfully",
      body: { comment: commentDeleted, post: updatedPost },
      code: 200,
    });
  }
};
