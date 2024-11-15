import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import type { Request, Response } from "express";
import get_user_details_service from "../services/get_user_details_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const userId: string = req.params.userId;
    const result = await get_user_details_service(userId);
    res.status(result.code).json(result);
  } catch (e) {
    const err = basicErrorResults(e, "Failed to get user details");
    res.status(err.code).json(err);
  }
};
