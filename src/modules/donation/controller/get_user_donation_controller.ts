import type { Request, Response } from "express";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import get_donation_service from "../services/get_user_donations_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const decoded = checkAuthToken(token);
    const email = decoded.email;
    const pageSize = req.query.pageSize as string;
    const pageNumber = req.query.pageNumber as string;
    const donation = await get_donation_service(email, pageNumber, pageSize);
    res.status(donation.code).json(donation);
  } catch (e) {
    const error = basicErrorResults(e, "Donations not found for this user");
    res.status(error.code).json(error);
  }
};
