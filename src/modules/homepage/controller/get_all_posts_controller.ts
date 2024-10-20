import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import type { Request, Response } from "express";
import get_all_posts_service from "../services/get_all_posts_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const pageNumber = req.query.pageNumber as string;
    const pageSize = req.query.pageSize as string;
    const result = await get_all_posts_service(pageNumber, pageSize);
    res.status(result.code).json(result);
  } catch (e) {
    const error = basicErrorResults(e, "Failed to get all posts");
    res.status(error.code).json(error);
  }
};
