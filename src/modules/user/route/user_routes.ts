import { Router } from "express";
import get_user_details_controller from "../controller/get_user_details_controller";
import upload_profile_pic_controller from "../controller/update_profilePic_controller";
import get_profile_image_controller from "../controller/get_profile_image_service";
const router = Router();

router.post("/user-details", get_user_details_controller);
router.post("/upload-profile-pic", upload_profile_pic_controller);
router.get("/download", get_profile_image_controller);

export default router;
