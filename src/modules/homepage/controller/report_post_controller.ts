import { type Request, type Response } from "express";
import {
  basicErrorResults,
  validateData,
} from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import type { IReportPost } from "../model/report_post";
import report_post_service from "../services/report_post_service";

export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);
    const like: IReportPost = req.body.reported;
    const result = await report_post_service(like);
    res.status(result.code).json(result);
  } catch (e) {
    const err = basicErrorResults(e, "Failed to report post");
    res.status(err.code).json(err);
  }
};
