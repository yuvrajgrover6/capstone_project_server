import multer from "multer";
import fs from "fs";
import UserModel from "../model/usermodel";
const profilePicUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads/profilePic/";
      if (!fs.existsSync(uploadDir)) {
        try {
          fs.mkdirSync(uploadDir, { recursive: true });
        } catch (err) {
          console.error("Error creating upload directory:", err);
          return cb(new Error("Upload directory cannot be created"), "");
        }
      }
      console.log("Uploading to directory:", uploadDir);
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1];
      const userId = req.params.userId;
      console.log("User ID:", userId);
      cb(null, `${userId}.${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    console.log("File MIME type:", file.mimetype);
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only .png, .jpg, and .gif files are allowed!"));
    }
    cb(null, true);
  },
}).single("file");

export default profilePicUpload;

export async function generateProfileDownloadLink(userId: string) {
  const path = `uploads/profilePic/${userId}.jpeg`;
  const downloadLink = `${
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
  }/user/download?name=${userId}&path=${path}`;
  console.log("Download link:", downloadLink);
  console.log("User ID:", userId);
  const res = await UserModel.findByIdAndUpdate(
    userId,
    { photoUrl: downloadLink },
    { new: true }
  );

  console.log("Update result:", res);

  if (!res) {
    throw new Error("Failed to update profile picture link");
  }

  return res;
}
