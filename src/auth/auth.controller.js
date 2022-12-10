import express from "express";
import { body } from "express-validator";
import { auth } from "../middleware/auth.js";
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
  validate,
];

const signUpValidation = [
  ...loginValidation,
  body("name").trim().notEmpty().withMessage("이름이 비어있습니다."),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("이메일 형식에 맞지 않습니다"),
  validate,
];

// 회원가입
authController.post("/signup", signUpValidation, authService.signup);

// 로그인
authController.post("/login", loginValidation, authService.login);

// me
authController.get("/me", auth, authService.me);

export default authController;
