import express from "express";
import * as authService from "./auth.service.js";

const authController = express.Router();

// validation

// 회원가입
authController.post("/signup", authService.signup);

// 로그인
authController.post("/login", authService.login);

export default authController;
