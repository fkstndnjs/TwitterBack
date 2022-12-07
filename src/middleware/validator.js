import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    res
      .status(400)
      .json({ error: errors.array().map((error) => ({ message: error.msg })) });
  }
};
