import { type Request, type Response } from "express";
import { basicErrorResults } from "../../../core/response_handlers/base_error_exception";
import { checkAuthToken } from "../../../core/validator/auth_token";

import { SuccessResult } from "../../../core/response_handlers/success_response";
import uploadPostImage, {
  generatePostImageDownloadLink,
} from "../services/add_post_image_service";
export default async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    checkAuthToken(token);

    uploadPostImage(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: err.message || "Upload error" });
      }

      const url = await generatePostImageDownloadLink(req.params.postId);
      const result = new SuccessResult({
        code: 200,
        message: "Post image uploaded successfully",
        body: { url },
      });
      res.status(200).json(result);
    });
  } catch (e) {
    const err = basicErrorResults(e, "Failed to upload post image");
    res.status(err.code).json(err);
  }
};
