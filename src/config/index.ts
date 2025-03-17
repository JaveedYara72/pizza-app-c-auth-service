// This is our config file, where we get our environment imports from
import { config } from "dotenv";

// import the method
config();

const { PORT, NODE_ENV } = process.env;

export const Config = {
    PORT,
    NODE_ENV,
};
