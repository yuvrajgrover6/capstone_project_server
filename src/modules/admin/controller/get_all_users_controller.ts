import type { Request, Response } from "express";
import { checkAdmin, checkAuthToken } from "../../../core/validator/auth_token";
import getAllUsersService from "../services/get_all_users_service";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";

export default async (req: Request, res: Response) => {
  try {
    const pageNumber = req.query.pageNumber as string;
    const pageSize = req.query.pageSize as string;
    const token = req.headers.authorization as string;
    const tokenn = checkAuthToken(token);
    checkAdmin(tokenn);
    const users = await getAllUsersService(pageNumber, pageSize);
    res.status(users.code).json(users);
  } catch (error) {
    const err = basicErrorResults(error, "Error getting all users");
    res.status(err.code).json(err);
  }
};
