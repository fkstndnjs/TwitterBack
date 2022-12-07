import express from "express";
import * as authService from "./auth.service.js";

const authController = express.Router();

authController.post("/signup", authService.signup);
authController.post("/login", authService.login);

export default authController;
