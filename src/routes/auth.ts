import express from "express";
import { Request, Response } from "express";

// import controller
import { AuthController } from "../controllers/AuthController";

// Initialize express router
const router = express.Router();

// create an instance of the controller
const authController = new AuthController();

router.post("/register", (req: Request, res: Response) => {
    authController.register(req, res);
});

export default router;
