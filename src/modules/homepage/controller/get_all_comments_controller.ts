import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import get_all_comments_service from "../services/get_all_comments_service";
import type { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const pageNumber = req.query.pageNumber as string;
    const pageSize = req.query.pageSize as string;
    const postId = req.query.postId as string;
    checkAuthToken(token);
    const result = await get_all_comments_service(pageNumber, pageSize, postId);
    res.status(result.code).json(result);
  } catch (e) {
    const error = basicErrorResults(e, "Failed to get all comments");
    res.status(error.code).json(error);
  }
};
