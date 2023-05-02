import React from "react";
import { User } from "../interfaces/user";
import { Form } from "react-bootstrap";

export function UserSelect({
    users,
    user,
    setCurrentUser
}: {
    users: User[];
    user: User;
    setCurrentUser: (id: number) => void;
}): JSX.Element {
    return (
        <div>
            <Form.Group controlId="userSelect">
                <Form.Label>Select Your Role:</Form.Label>
                <Form.Select
                    value={user.id}
                    onChange={(e) => setCurrentUser(parseInt(e.target.value))}
                >
                    {users.map((currUser: User) => (
                        <option key={currUser.id} value={currUser.id}>
                            {currUser.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
