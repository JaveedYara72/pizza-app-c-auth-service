import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

// logger import
import logger from "./logger";

// router import
import authRouter from "../routes/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check endpoint
app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("OK");
});

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

// Auth Routes
app.use("/auth", authRouter);

// global error handler - middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const statuscode = err.statusCode || 500;

    res.status(statuscode).send({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: "",
                location: "",
            },
        ],
    });
});

export default app;
