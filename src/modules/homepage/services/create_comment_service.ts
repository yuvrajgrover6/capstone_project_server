import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { CommentModel, type IComment } from "../model/comments_model";
import { PostModel, type IPost } from "../model/posts_model";

export default async (comment: IComment) => {
  const commentCreated: IComment = await CommentModel.create(comment);
  const updatedPost: IPost | null = await PostModel.findByIdAndUpdate(
    comment.postId,
    { $inc: { comment_count: 1 } },
    { new: true }
  );

  if (!commentCreated || !updatedPost) {
    throw new BaseErrorException({
      code: 500,
      message: "Error while adding comment",
      error: "ERROR_WHILE_ADDING_COMMENT",
      logInfo: { comment },
    });
  } else {
    return new SuccessResult({
      message: "Comment added successfully",
      body: { comment: commentCreated, post: updatedPost },
      code: 200,
    });
  }
};
