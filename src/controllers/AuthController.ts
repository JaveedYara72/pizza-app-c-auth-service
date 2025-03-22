import { Response } from "express";

// types import
import { RegisterUserRequest } from "../types/index";

// import user service
import { UserService } from "../services/UserServices";

export class AuthController {
    constructor(private userService: UserService) {}

    async register(req: RegisterUserRequest, res: Response) {
        // import all the details
        const { firstName, lastName, email, password } = req.body;

        // create user
        await this.userService.create({ firstName, lastName, email, password });

        res.status(201).json({ message: "User created successfully" });
    }
}
