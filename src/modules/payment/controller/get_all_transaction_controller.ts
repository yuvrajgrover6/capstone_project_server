import type { Request, Response } from "express";
import { checkAuthToken } from "../../../core/validator/auth_token";
import get_all_transactions from "../services/get_all_transactions";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const pageNumber = req.query.pageNumber as string;
    const pageSize = req.query.pageSize as string;
    checkAuthToken(token);
    const result = await get_all_transactions(pageNumber, pageSize);
    res.status(result.code).json(result);
  } catch (e) {
    const err = basicErrorResults(e, "Failed to get all transactions");
    res.status(err.code).json(err);
  }
};
