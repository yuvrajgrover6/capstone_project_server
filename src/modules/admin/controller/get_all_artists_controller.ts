import type { Request, Response } from "express";
import { checkAdmin, checkAuthToken } from "../../../core/validator/auth_token";
import getAllArtists from "../services/get_all_artists_service";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";

export default async (req: Request, res: Response) => {
  try {
    const pageNumber = req.query.pageNumber as string;
    const pageSize = req.query.pageSize as string;
    const token = req.headers.authorization as string;
    const tokenn = checkAuthToken(token);
    checkAdmin(tokenn);
    const users = await getAllArtists(pageNumber, pageSize);
    res.status(users.code).json(users);
  } catch (error) {
    const err = basicErrorResults(error, "Error getting all artists");
    res.status(err.code).json(err);
  }
};
