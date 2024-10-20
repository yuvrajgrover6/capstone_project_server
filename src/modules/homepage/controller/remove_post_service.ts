import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import remove_post_service from "../services/remove_post_service";
import type { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const postId: string = req.params.postId;
    const result = await remove_post_service(postId);
    res.status(result.code).json(result);
  } catch (e) {
    const err = basicErrorResults(e, "Failed to remove post");
    res.status(err.code).json(err);
  }
};
