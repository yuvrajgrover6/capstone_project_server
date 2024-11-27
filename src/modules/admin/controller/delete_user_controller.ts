import type { Request, Response } from "express";
import { checkAdmin, checkAuthToken } from "../../../core/validator/auth_token";
import delete_users_service from "../services/delete_users_service";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = req.params.userId as string;
    const tokenn = checkAuthToken(token);
    checkAdmin(tokenn);
    const users = await delete_users_service(userId);
    res.status(users.code).json(users);
  } catch (error) {
    const err = basicErrorResults(error, "Error deleting user");
    res.status(err.code).json(err);
  }
};
