// This is our config file, where we get our environment imports from
import { config } from "dotenv";
import path from "path";

// import the method, This will also load the env variables based on the environment
// Here, based on the command, it will load the env variables from .env.development or .env.production
config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

// Here we are getting the environment variables
const {
    PORT,
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    REFRESH_TOKEN_SECRET,
} = process.env;

export const Config = {
    PORT,
    NODE_ENV,
    DB_NAME,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_PORT,
    REFRESH_TOKEN_SECRET,
};
