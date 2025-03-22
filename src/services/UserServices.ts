import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { User } from "../entity/User";
import { UserData } from "../types/index";

export class UserService {
    constructor(private userReporepository: Repository<User>) {
        this.userReporepository = userReporepository;
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
