import { User } from "../interfaces/user";
import users from "./users.json";

export const USERS = users.map(
    (user): User => ({
        ...user
    })
);
