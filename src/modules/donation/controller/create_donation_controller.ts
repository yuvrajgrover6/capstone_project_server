import type { Request, Response } from "express";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import create_donation_service from "../services/create_donation_service";
import { DonationJSONSchema, type IDonation } from "../model/dontation_model";
import { validateData } from "../../../core/validator/json_validator";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const donation: IDonation = req.body;
    validateData(DonationJSONSchema, donation);
    const result = await create_donation_service(donation);
    res.status(result.code).json(result);
  } catch (e) {
    const error = basicErrorResults(e, "Failed to create donation");
    res.status(error.code).json(error);
  }
};
