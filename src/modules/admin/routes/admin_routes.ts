import { Router } from "express";
import get_all_users_controller from "../controller/get_all_users_controller";
import get_all_artists_controller from "../controller/get_all_artists_controller";
import delete_user_controller from "../controller/delete_user_controller";
import delete_artist_controller from "../controller/delete_artist_controller";

const router = Router();

router.get("/get-all-users", get_all_users_controller);
router.get("/get-all-artists", get_all_artists_controller);
router.delete("/delete-user/:userId", delete_user_controller);
router.delete("/delete-artist/:userId", delete_artist_controller);

export default router;
