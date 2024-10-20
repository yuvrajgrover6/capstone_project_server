import { type Request, type Response } from "express";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import remove_like_service from "../services/remove_like_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const likeId: string = req.params.likeId;
    const result = await remove_like_service(likeId);
    res.status(result.code).json(result);
  } catch (e) {
    const err = basicErrorResults(e, "Failed to remove like");
    res.status(err.code).json(err);
  }
};
