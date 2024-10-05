import type { Request, Response } from "express";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import delete_donation_service from "../services/delete_donation_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const donationId = req.body.id;
    const result = await delete_donation_service(donationId);
    res.status(result.code).json(result);
  } catch (e) {
    const error = basicErrorResults(e, "Failed to delete donation");
    res.status(error.code).json(error);
  }
};
