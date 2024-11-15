import { Router } from "express";
import get_user_details_controller from "../controller/get_user_details_controller";
const router = Router();

router.post("/user-details", get_user_details_controller);

export default router;
