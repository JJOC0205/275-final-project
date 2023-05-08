import React from "react";
import { useState } from "react";
import { superAddUser } from "../App";
import { Movie } from "../interfaces/movie";
// import { User } from "../interfaces/user";

export function SuperAddUser({
    users,
    setUsers,
    userListPairs,
    setUserListPairs
}: superAddUser): JSX.Element {
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<number>(3);
    const [role, setRole] = useState<string>("");
    // const [selectedUser, setSelectedUser] = useState<User>(users[0]);

    function addUser() {
        const isExistingUser = users.some(
            (user) => user.name === name || user.id === id
        );

        if (!isExistingUser && role === "user") {
            const newUser = { name, id, role };
            const newUserList: Movie[] = [];
            setUsers([...users, newUser]);
            setUserListPairs([
                ...userListPairs,
                { username: newUser.name, userList: newUserList }
            ]);
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
            <div style={{ marginTop: "10px" }}>
                ADD NEW USER{" "}
                <input
                    type="text"
                    placeholder="Enter New User Name"
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: "5px" }}
                />
                <input
                    type="number"
                    placeholder="Enter ID"
                    onChange={(e) => setId(parseInt(e.target.value))}
                    style={{ marginBottom: "5px" }}
                />
                <input
                    type="text"
                    placeholder="Enter Role"
                    onChange={(e) => setRole(e.target.value)}
                    style={{ marginBottom: "5px" }}
                />
                <button onClick={addUser}>Add New User</button>
            </div>
            <div>
                DELETE USER{" "}
                <input
                    type="text"
                    placeholder="Enter User Name"
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: "5px" }}
                />
                <input
                    type="number"
                    placeholder="Enter ID"
                    onChange={(e) => setId(parseInt(e.target.value))}
                    style={{ marginBottom: "5px" }}
                />
                <input
                    type="text"
                    placeholder="Enter Role"
                    onChange={(e) => setRole(e.target.value)}
                    style={{ marginBottom: "5px" }}
                />
                <button onClick={deleteUser}>Delete User</button>
            </div>
        </>
    );
}
