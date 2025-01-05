"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateUserFields = [
    (0, express_validator_1.body)("firstname")
        .trim()
        .notEmpty()
        .withMessage("First name is required")
        .isLength({ min: 4 })
        .withMessage("First name must be at least 4 characters long"),
    (0, express_validator_1.body)("lastname")
        .trim()
        .notEmpty()
        .withMessage("Last name is required")
        .isLength({ min: 4 })
        .withMessage("Last name must be at least 4 characters long"),
    (0, express_validator_1.body)("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters long"),
];
exports.default = validateUserFields;
