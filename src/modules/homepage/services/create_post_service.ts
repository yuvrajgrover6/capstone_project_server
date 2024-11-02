import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { PostModel, type IPost } from "../model/posts_model";

export default async (post: any) => {
  const postCreated: IPost = {
    id: Math.random().toString(36).substring(7),
    title: post.title,
    body: post.body,
    artistId: post.artistId,
    like_count: 0,
    comment_count: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const postModel = new PostModel(postCreated);
  const p = await postModel.save();

  if (!p) {
    throw new BaseErrorException({
      code: 500,
      message: "Error while creating post",
      error: "ERROR_WHILE_CREATING_POST",
      logInfo: { post },
    });
  } else {
    return new SuccessResult({
      message: "Post created successfully",
      body: { post: p },
      code: 200,
    });
  }
};
