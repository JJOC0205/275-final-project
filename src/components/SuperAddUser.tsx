import React from "react";
import { useState } from "react";
import { superAddUser } from "../App";
import { Movie } from "../interfaces/movie";
import { UserListPair } from "../interfaces/UserListPair";
import { Form } from "react-bootstrap";
import "./SuperAddUser.css";

export function SuperAddUser({
    users,
    setUsers,
    userListPairs,
    setUserListPairs
}: superAddUser): JSX.Element {
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<number>(3);
    const [role, setRole] = useState<string>("");

    function addUser() {
        const isExistingUser = users.some(
            (user) => user.name === name || user.id === id
        );

        if (!isExistingUser) {
            const newUser = { name, id, role };
            setUsers([...users, newUser]);
            const newUserList: Movie[] = [];
            const newUserPairs: UserListPair[] = [
                ...userListPairs,
                { username: newUser.name, userList: newUserList }
            ];
            setUserListPairs(newUserPairs);
        }
    }

    function deleteUser() {
        const updatedUsers = users.filter(
            (user) => user.name !== name || user.id !== id || user.role !== role
        );
        setUsers(updatedUsers);
    }

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: "10px" }}>
                    <h5>ADD NEW USER</h5>
                    <input
                        type="text"
                        placeholder="Enter New User Name"
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    <input
                        type="number"
                        placeholder="Enter Your SSN"
                        onChange={(e) => setId(parseInt(e.target.value))}
                        style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    <Form.Group controlId="userRoles">
                        <Form.Label>Choose your role</Form.Label>
                        <Form.Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="super">Super</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Form.Select>
                    </Form.Group>
                    <button onClick={addUser}>Add</button>
                </div>
                <div>
                    <h5>DELETE USER</h5>
                    <input
                        type="text"
                        placeholder="Enter User Name"
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    <input
                        type="number"
                        placeholder="Enter ID"
                        onChange={(e) => setId(parseInt(e.target.value))}
                        style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    <input
                        type="text"
                        placeholder="Enter Role"
                        onChange={(e) => setRole(e.target.value)}
                        style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    <button onClick={deleteUser}>Delete</button>
                </div>
            </div>
        </>
    );
}
