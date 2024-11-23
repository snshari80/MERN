import express from "express";
import { signUp, login, signUpTest } from "../../Controller/Auth/authController.js";
import protectedRouter from "../../MiddleWare/AuthMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signUp);
router.post("/me", protectedRouter, signUpTest);

export default router;
