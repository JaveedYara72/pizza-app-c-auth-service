import { Repository } from "typeorm";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { UserData } from "../types/index";
import createHttpError from "http-errors";
import { Roles } from "../constants/index";

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
        // check if the user already exists with that email
        const user = await this.userRepository.findOne({
            where: { email: email },
        });

        // if the user already exists with that email,
        // then throw an error
        if (user) {
            const error = createHttpError(
                400,
                "User already exists with that email",
            );
            throw error;
        }

        // hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // we are decoupling bc, why the fuck?? Why cant we just simply build applications
        // instead of wasting time here?
        // save the user
        try {
            return await this.userRepository.save({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: Roles.CUSTOMER,
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
