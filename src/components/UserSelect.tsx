import React, { useState } from "react";
import { User } from "../interfaces/user";
import { Form } from "react-bootstrap";

export function UserSelect({ users }: { users: User[] }): JSX.Element {
    const [user, setUser] = useState<User>();
    const [ListofUsers] = useState<User[]>(users);

    function updateUser(event: React.ChangeEvent<HTMLSelectElement>) {
        setUser(event.target.value);
    }

    return (
        <div>
            <Form.Group controlId="userSelect">
                <Form.Label>Select Your Role:</Form.Label>
                <Form.Select value={user} onChange={updateUser}>
                    <option value={}>Super User</option>
                    <option value={}>Administrator</option>
                    <option value={ListofUsers[0].id}>User 1</option>
                </Form.Select>
            </Form.Group>
        </div>
    );
}
