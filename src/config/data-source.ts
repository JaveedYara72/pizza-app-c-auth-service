import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Config } from "./index";
import { RefreshToken } from "../entity/RefreshToken";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Config.DB_HOST,
    port: Number(Config.DB_PORT),
    username: Config.DB_USERNAME,
    password: Config.DB_PASSWORD,
    database: Config.DB_NAME,
    // Make this off for production
    synchronize: Config.NODE_ENV === "dev",
    logging: false,
    // entities is the table name / entity name.
    entities: [User, RefreshToken],
    migrations: [],
    subscribers: [],
});
