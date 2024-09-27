import { Router } from "express";

import login from "../controller/login_controller";
import signup from "../controller/signup_controller";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
