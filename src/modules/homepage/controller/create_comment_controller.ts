import { type Request, type Response } from "express";
import {
  basicErrorResults,
  validateData,
} from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import create_comment_service from "../services/create_comment_service";
import { CommentJSONSchema, type IComment } from "../model/comments_model";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const comment: IComment = req.body.comment;
    validateData(CommentJSONSchema, comment);
    const result = await create_comment_service(comment);
    res.status(result.code).json(result);
  } catch (e) {
    const err = basicErrorResults(e, "Failed to add comment");
    res.status(err.code).json(err);
  }
};
