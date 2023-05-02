import React, { useState } from "react";
import { User } from "../interfaces/user";
import { Form } from "react-bootstrap";

export function UserSelect({ users }: { users: User[] }): JSX.Element {
    const [ListofUsers] = useState<User[]>(users);
    const [user, setUser] = useState<string>(ListofUsers[0].role);

    function updateUser(event: React.ChangeEvent<HTMLSelectElement>) {
        setUser(event.target.value);
    }

    return (
        <div>
            <Form.Group controlId="userSelect">
                <Form.Label>Select Your Role:</Form.Label>
                <Form.Select value={user} onChange={updateUser}>
                    {ListofUsers.map((currUser: User) => (
                        <option key={currUser.role} value={currUser.role}>
                            {currUser.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
