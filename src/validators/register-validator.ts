import { checkSchema } from "express-validator";

export default checkSchema({
    email: {
        trim: true,
        errorMessage: "Email is required!.",
        notEmpty: true,
        isEmail: {
            errorMessage: "Should be a valid email",
        },
    },
    firstName: {
        trim: true,
        errorMessage: "First Name is required",
        notEmpty: true,
    },
    lastName: {
        trim: true,
        errorMessage: "Last Name is required",
        notEmpty: true,
    },
    password: {
        trim: true,
        errorMessage: "Password is required",
        isLength: {
            options: {
                min: 8,
            },
            errorMessage: "Password should atleast be of 8 characters",
        },
    },
});
