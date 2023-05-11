import React from "react";
import { useState } from "react";
import { superAddUser } from "../App";
import { Movie } from "../interfaces/movie";
// import { User } from "../interfaces/user";
import { UserListPair } from "../interfaces/UserListPair";

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

        if (!isExistingUser) {
            const newUser = { name, id, role: "user" };
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
        if (role === "user") {
            const updatedUsers = users.filter(
                (user) =>
                    user.name !== name || user.id !== id || user.role !== role
            );
            setUsers(updatedUsers);
        }
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
                        placeholder="Enter New User ID"
                        onChange={(e) => setId(parseInt(e.target.value))}
                        style={{ marginBottom: "5px", marginRight: "5px" }}
                    />
                    {/* <input
                        type="text"
                        placeholder="Enter New User Role"
                        onChange={(e) => setRole(e.target.value)}
                        style={{ marginBottom: "5px", marginRight: "5px" }}
                    /> */}
                    <button data-testid="addUser" onClick={addUser}>
                        Add
                    </button>
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
                    <button data-testid="deleteUser" onClick={deleteUser}>
                        Delete
                    </button>
                </div>
            </div>
            <div
                style={{
                    width: "300px",
                    marginLeft: "75px",
                    height: "150px",
                    border: "1px dashed grey",
                    overflow: "auto"
                }}
            >
                <h2>Current Users:</h2>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.name}, ID: {user.id}, Role: {user.role}
                    </li>
                ))}
            </div>
        </>
    );
}
