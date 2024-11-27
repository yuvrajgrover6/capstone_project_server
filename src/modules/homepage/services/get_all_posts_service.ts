import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { LikeModel } from "../model/like_model";
import { PostModel, type IPost } from "../model/posts_model";

export default async (pageNumber: string, pageSize: string, userId: string) => {
  const page = parseInt(pageNumber) || 1;
  const limit = parseInt(pageSize) || 10;

  const posts = await PostModel.find()
    .limit(limit)
    .skip(limit * (page - 1))
    .sort({ createdAt: -1 });

  if (!posts) {
    throw new BaseErrorException({
      code: 404,
      message: "Posts not found",
      error: "Not Found",
      logInfo: "Posts not found",
    });
  }

  const postsAndLikedStatus: postAndLikedStatus[] = [];

  for (const post of posts) {
    const like = await LikeModel.findOne({ postId: post._id, userId });

    postsAndLikedStatus.push({
      post,
      isLikedByUser: like ? true : false,
    });
  }

  return new SuccessResult({
    code: 200,
    message: "Posts retrieved successfully",
    body: { postsAndLikedStatus },
  });
};

interface postAndLikedStatus {
  post: IPost;
  isLikedByUser: boolean;
}
