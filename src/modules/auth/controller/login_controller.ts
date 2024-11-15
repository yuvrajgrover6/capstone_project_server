import type { Request, Response } from "express";
import login from "../services/login_service";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
// export default arrow function

export default async function (req: Request, res: Response) {
  try {
    console.log(req.body);
    const { email, password, type } = req.body;
    // call login service
    const result = await login(email, password, type);

    // send response
    res.status(result.code).json(result);
  } catch (e) {
    console.log(e);
    const error = basicErrorResults(e, "Login failed");
    res.status(error.code).json(error);
  }
}
