import { NextFunction, Response } from "express";

// types import
import { RegisterUserRequest } from "../types/index";

// import user service
import { UserService } from "../services/UserServices";

// logger
import { Logger } from "winston";

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

        try {
            // create user
            const user = await this.userService.create({
                firstName,
                lastName,
                email,
                password,
            });

            this.logger.info("User created successfully", { id: user.id });
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
