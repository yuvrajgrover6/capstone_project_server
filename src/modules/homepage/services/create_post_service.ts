import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
import { PostModel, type IPost } from "../model/posts_model";

export default async (post: IPost) => {
  const postCreated: IPost = await PostModel.create(post);

  if (!postCreated) {
    throw new BaseErrorException({
      code: 500,
      message: "Error while creating post",
      error: "ERROR_WHILE_CREATING_POST",
      logInfo: { post },
    });
  } else {
    return new SuccessResult({
      message: "Post created successfully",
      body: { post: postCreated },
      code: 200,
    });
  }
};
