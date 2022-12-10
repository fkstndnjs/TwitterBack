import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  // "express-validator"에서 req에 넘겨준 validation 결과를 validationResult()로 가져올 수 있다
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({
      error: errors.array().map((error) => ({ message: error.msg })),
    });
  }
};
