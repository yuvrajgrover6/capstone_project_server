import type { Request, Response } from "express";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import get_all_donations from "../services/get_all_donations";
import { checkAdmin, checkAuthToken } from "../../../core/validator/auth_token";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const pageSize = req.query.pageSize as string;
    const pageNumber = req.query.pageNumber as string;
    const decoded = checkAuthToken(token);
    checkAdmin(decoded);
    const user = await get_all_donations(pageNumber, pageSize);
    res.status(user.code).json(user);
  } catch (e) {
    const error = basicErrorResults(e, "Login failed");
    res.status(error.code).json(error);
  }
};
