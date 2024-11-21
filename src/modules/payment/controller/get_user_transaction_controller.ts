import type { Request, Response } from "express";
import { checkAuthToken } from "../../../core/validator/auth_token";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import delete_transaction_service from "../services/delete_transaction_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const transactionId = req.params.transactionId as string;
    checkAuthToken(token);
    const result = await delete_transaction_service(transactionId);
    res.status(result.code).json(result);
  } catch (e) {
    const error = basicErrorResults(e, "Failed to create transaction");
    res.status(error.code).json(error);
  }
};
