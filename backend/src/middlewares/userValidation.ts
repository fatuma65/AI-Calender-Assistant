
import { body } from "express-validator";

const validateUserFields = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 4 })
    .withMessage("First name must be at least 4 characters long"),

  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 4 })
    .withMessage("Last name must be at least 4 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

export default validateUserFields;
