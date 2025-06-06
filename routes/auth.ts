import express from "express";
import authController from "../controllers/auth";

const router = express.Router();
router.post("/users/create", authController.createUser);
router.post("/login", authController.login);

export default router;
