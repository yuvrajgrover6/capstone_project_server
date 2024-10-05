import { Router } from "express";
const router = Router();
import update_donation_controller from "../controller/update_donation_controller";
import delete_donation_controller from "../controller/delete_donation_controller";
import get_user_donation_controller from "../controller/get_user_donation_controller";
import get_all_donation_controller from "../controller/get_all_donations_controller";

router.put("/update", update_donation_controller);
router.delete("/delete", delete_donation_controller);
router.get("/user", get_user_donation_controller);
router.get("/", get_all_donation_controller);

export default router;
