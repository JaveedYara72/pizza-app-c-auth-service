import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { UserData } from "../types/index";

export class UserService {
    // this.userRepository is the property of UserService
    // which is of type Repository<User>
    // Repository<User> is the type of the user repository
    // which is the type of the user entity
    // which is the type of the user table
    constructor(private userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    async create({ firstName, lastName, email, password }: UserData) {
        // create user
        // get the user repository

        // we are decoupling bc, why the fuck?? Why cant we just simply build applications
        // instead of wasting time here?
        const userRepository = AppDataSource.getRepository(User);
        // save the user
        await userRepository.save({ firstName, lastName, email, password });
    }
}
