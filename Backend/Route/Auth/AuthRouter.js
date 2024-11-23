import express from "express";
import { signUp, login, logoff, fetchProfile } from "../../Controller/Auth/authController.js";
import protectedRouter from "../../MiddleWare/AuthMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/fetchProfile", protectedRouter, fetchProfile);
router.post("/logoff", protectedRouter, logoff);

export default router;
