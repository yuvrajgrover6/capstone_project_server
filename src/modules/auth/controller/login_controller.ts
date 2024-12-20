import type { Request, Response } from "express";
import login from "../services/login_service";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
// export default arrow function

export default async function (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    // call login service
    const result = await login(email, password);

    // send response
    res.status(result.code).json(result);
  } catch (e) {
    const error = basicErrorResults(e, "Login failed");
    res.status(error.code).json(error);
  }
}
