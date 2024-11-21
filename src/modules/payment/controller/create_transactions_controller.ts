import type { Request, Response } from "express";
import type { IPayment } from "../model/payment_model";

import create_transaction_service from "../services/create_transaction_service";
import { checkAuthToken } from "../../../core/validator/auth_token";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const transaction = req.body.transaction as IPayment;
    const { email } = checkAuthToken(token);
    const result = await create_transaction_service(transaction);
    res.status(result.code).json(result);
  } catch (e) {
    const error = basicErrorResults(e, "Failed to create transaction");
    res.status(error.code).json(error);
  }
};
