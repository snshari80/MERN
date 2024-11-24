import express from "express";
import { signUp, login, logoff } from "../../Controller/Auth/authController.js";
import protectedRouter from "../../MiddleWare/AuthMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/logoff", protectedRouter, logoff);

export default router;
