import type { Request, Response } from "express";
import { checkAuthToken } from "../../../core/validator/auth_token";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import get_user_details_service from "../../user/services/get_user_details_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const { userId } = checkAuthToken(token);
    const result = await get_user_details_service(userId);
    res.status(result.code).json(result);
  } catch (e) {
    const error = basicErrorResults(e, "Failed to get transactions");
    res.status(error.code).json(error);
  }
};
