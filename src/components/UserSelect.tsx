import React from "react";
import { User } from "../interfaces/user";
import { Form } from "react-bootstrap";
import { userSelect } from "../App";
import { UserListPair } from "../interfaces/UserListPair";

export function UserSelect({
    users,
    setUserMovies,
    userListPairs,
    setUser
}: userSelect): JSX.Element {
    function setCurrentUser(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedUserId = parseInt(event.target.value);
        const selectedUserName = users[selectedUserId].name;

        setUser(users[selectedUserId]);

        const currUserMovies = userListPairs.filter(
            (pairs: UserListPair) => selectedUserName === pairs.username
        );
        const currUserList = currUserMovies[0].userList;
        setUserMovies(currUserList);

        console.log(currUserList);
    }
    return (
        <div>
            <Form.Group controlId="userSelect">
                <Form.Label>Select Your Role:</Form.Label>
                <Form.Select onChange={setCurrentUser}>
                    {users.map((currUser: User, index) => (
                        <option key={index} value={index}>
                            {currUser.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
