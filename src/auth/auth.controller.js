import express from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authService from "./auth.service.js";

const authController = express.Router();

// validation
const loginValidation = [
    body("username").trim().notEmpty().withMessage("username을 입력해주세요."),
    body("password")
        .trim()
        .isLength({ min: 5 })
        .withMessage("비밀번호는 최소 5글자 이상 입력해주세요."),
    validate(),
];

// 회원가입
authController.post("/signup", authService.signup);

// 로그인
authController.post("/login", loginValidation, authService.login);

export default authController;
