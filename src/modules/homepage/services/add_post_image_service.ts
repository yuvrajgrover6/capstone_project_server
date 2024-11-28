import multer from "multer";
import fs from "fs";
import { PostModel } from "../model/posts_model";
import { BaseErrorException } from "../../../core/response_handlers/base_error_exception";
import { SuccessResult } from "../../../core/response_handlers/success_response";
const uploadPostImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads/posts/";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${req.params.postId}.jpg`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only .png, .jpg and .gif files are allowed!"));
    }
    cb(null, true);
  },
}).single("file");
export default uploadPostImage;

export async function updatePostImageUrl(postId: string) {
  const url = await generatePostImageDownloadLink(postId);
  const newPost = await PostModel.findByIdAndUpdate(
    postId,
    { imageUrl: url },
    { new: true }
  );
  if (!newPost) {
    throw new BaseErrorException({
      code: 400,
      message: "Failed to update post image",
      error: "Post not found",
      logInfo: { postId },
    });
  }
  return new SuccessResult({
    code: 200,
    message: "Post image uploaded successfully",
    body: { post: newPost },
  });
}

export async function generatePostImageDownloadLink(postId: string) {
  const path = `uploads/posts/${postId}.jpg`;
  const downloadLink = `${
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
  }/user/download?name=${postId}&path=${path}`;
  return downloadLink;
}
