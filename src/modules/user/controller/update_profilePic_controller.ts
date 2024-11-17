import { type Request, type Response } from "express";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";
import upload, {
  generateProfileDownloadLink,
} from "../services/update_profilePic_service";
import { SuccessResult } from "../../../core/response_handlers/success_response";
export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);

    upload(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message || "Upload error" });
      }

      const url = await generateProfileDownloadLink(req.params.userId);
      const result = new SuccessResult({
        code: 200,
        message: "Profile picture uploaded successfully",
        body: { url },
      });
      res.status(200).json(result);
    });
  } catch (e) {
    const err = basicErrorResults(e, "Failed to upload profile picture");
    res.status(err.code).json(err);
  }
};
