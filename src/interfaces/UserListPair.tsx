import { Movie } from "./movie";

export interface UserListPair {
    username: string;
    userList: Movie[];
}

export const allUsers: UserListPair[] = [
    {
        username: "User1",
        userList: []
    },
    {
        username: "User2",
        userList: []
    }
];
