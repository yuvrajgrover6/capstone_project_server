import multer from "multer";
import fs from "fs";
const profilePicUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "uploads/profilePice/";
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${req.params.userId}.${extension}`);
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
export default profilePicUpload;

export async function generateProfileDownloadLink(userId: string) {
  const path = `uploads/profilePice/${userId}.jpg`;
  const downloadLink = `${
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
  }/user/download?name=${userId}&path=${path}`;
  return downloadLink;
}
