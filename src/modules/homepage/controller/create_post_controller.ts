import { type Request, type Response } from "express";
import {
  basicErrorResults,
  validateData,
} from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import { PostJSONSchema, type IPost } from "../model/posts_model";
import create_post_service from "../services/create_post_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const post: IPost = req.body.post;
    validateData(PostJSONSchema, post);
    const result = await create_post_service(post);
    res.status(result.code).json(result);
  } catch (e) {
    const err = basicErrorResults(e, "Failed to add Post");
    res.status(err.code).json(err);
  }
};
