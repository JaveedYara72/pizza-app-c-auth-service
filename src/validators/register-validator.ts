import { body } from "express-validator"; // Import express-validator

export default [
    body("email")
        .notEmpty()
        .isEmail()
        .withMessage("Please Enter a Valid email"),
    body("firstName").notEmpty().withMessage("Please Enter a First Name"),
];
