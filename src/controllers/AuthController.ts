import { NextFunction, Response } from "express";
// types import
import { RegisterUserRequest } from "../types/index";
// import user service
import { UserService } from "../services/UserServices";
// logger
import { Logger } from "winston";
import { validationResult } from "express-validator";

// import jwt
import { JwtPayload, sign } from "jsonwebtoken";

import fs from "fs";
import path from "path";
import createHttpError from "http-errors";
import { Config } from "../config/index";

export class AuthController {
    constructor(
        private userService: UserService,
        private logger: Logger,
    ) {}

    async register(
        req: RegisterUserRequest,
        res: Response,
        next: NextFunction,
    ) {
        // import all the details
        const { firstName, lastName, email, password } = req.body;

        // add request validation here
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        try {
            // create user
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });

            this.logger.info("User created successfully", { id: user.id });

            // Make a cookie with access token and refresh token
            // generate the privatekey, public key using internal crypto module

            let privateKey: string;
            try {
                privateKey = fs.readFileSync(
                    path.join(__dirname, "../../certs/private.pem"),
                    "utf-8", // Added encoding parameter
                );
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                const error = createHttpError(
                    500,
                    "Error while reading the private key",
                );
                return next(error); // Added return statement
            }

            const payload: JwtPayload = {
                sub: String(user.id),
                role: user.role,
            };

            const accessToken = sign(payload, privateKey, {
                algorithm: "RS256",
                expiresIn: "1h",
                issuer: "auth-service",
            });

            // adding this exclamation mark says that its not null.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const refreshToken = sign(payload, Config.REFRESH_TOKEN_SECRET!, {
                algorithm: "HS256",
                expiresIn: "1y",
                issuer: "auth-service",
            });

            res.cookie("accessToken", accessToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60, // one hour
                httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
                domain: "localhost",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 365, // one year
                httpOnly: true,
            });

            res.status(201).json({
                message: "User created successfully",
                id: user.id,
            });
        } catch (err) {
            next(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
