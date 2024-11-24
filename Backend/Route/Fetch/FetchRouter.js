import express from "express";
import { fetchProfile } from "../../Controller/Fetch/fetchController.js";
import protectedRouter from "../../MiddleWare/AuthMiddleware.js";

const router = express.Router();

router.get("/profile", protectedRouter, fetchProfile);

export default router;
