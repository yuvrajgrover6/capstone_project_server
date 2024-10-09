import type { Request, Response } from "express";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { signup } from "../services/signup_service";

export default async function (req: Request, res: Response) {
  try {
    const { user, type } = req.body;

    console.log("req.body", req.body);

    // call login service
    const result = await signup(user, type);

    // send response
    res.status(result.code).json(result);
  } catch (e) {
    // handle error
    const error = basicErrorResults(e, "Failed to create user");
    res.status(error.code).json(error);
  }
}
