import { Router } from "express";
import get_all_posts_controller from "../controller/get_all_posts_controller";
import create_post_controller from "../controller/create_post_controller";
import get_all_comments_controller from "../controller/get_all_comments_controller";
import remove_like_controller from "../controller/remove_like_controller";
import add_like_controller from "../controller/add_like_controller";
import create_comment_controller from "../controller/create_comment_controller";
import remove_post_controller from "../controller/remove_post_controller";
import get_all_likes_controller from "../controller/get_all_likes_controller";
import add_post_image_controller from "../controller/add_post_image_controller";
import get_post_image_controller from "../controller/get_post_image_controller";
import report_post_controller from "../controller/report_post_controller";

const router = Router();

router.get("/posts", get_all_posts_controller);
router.post("/createPost", create_post_controller);
router.delete("/deletePost/:postId", remove_post_controller);
router.post("/addComment", create_comment_controller);
router.post("/addLike", add_like_controller);
router.delete("/deleteComment/:commentId", remove_like_controller);
router.delete("/deleteLike/:likeId", remove_like_controller);
router.get("/getComments/:postId", get_all_comments_controller);
router.get("/getLikes/:postId", get_all_likes_controller);
router.post("/upload-post-image/:postId", add_post_image_controller);
router.get("/download", get_post_image_controller);
router.post("/report", report_post_controller);

export default router;
