import { Repository } from "typeorm";
import { User } from "../entity/User";
import { UserData } from "../types/index";
import createHttpError from "http-errors";

export class UserService {
    // this.userRepository is the property of UserService
    // which is of type Repository<User>
    // Repository<User> is the type of the user repository
    // which is the type of the user entity
    // which is the type of the user table

    // this userRepository is of the type Repository<User>
    // which is the type of the user database table
    // which is the type of the user entity
    constructor(private userRepository: Repository<User>) {}

    async create({ firstName, lastName, email, password }: UserData) {
        // create user
        // get the user repository

        // we are decoupling bc, why the fuck?? Why cant we just simply build applications
        // instead of wasting time here?
        // save the user
        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password,
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            const error = createHttpError(
                500,
                "Failed to store it in the database",
            );
            throw error;
        }
    }
}
