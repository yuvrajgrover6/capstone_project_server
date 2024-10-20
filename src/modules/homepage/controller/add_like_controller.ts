import { type Request, type Response } from "express";
import {
  basicErrorResults,
  validateData,
} from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import { type ILike, LikeJSONSchema } from "../model/like_model";
import add_like_service from "../services/add_like_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const like: ILike = req.body.like;
    validateData(LikeJSONSchema, like);
    const result = await add_like_service(like);
    res.status(result.code).json(result);
  } catch (e) {
    const err = basicErrorResults(e, "Failed to add like");
    res.status(err.code).json(err);
  }
};
