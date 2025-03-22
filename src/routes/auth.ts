import express from "express";
import { Request, Response } from "express";

// import controller
import { AuthController } from "../controllers/AuthController";
import { UserService } from "../services/UserServices";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";

// Initialize express router
const router = express.Router();

// Dependency Injections
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService(userRepository);
// create an instance of the controller
const authController = new AuthController(userService);

router.post("/register", (req: Request, res: Response) => {
    authController.register(req, res);
});

export default router;
