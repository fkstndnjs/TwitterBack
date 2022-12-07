import express from "express";

const authController = express.Router();

authController.post("/signup");
authController.post("/login");
export default authController;
