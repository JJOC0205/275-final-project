import React from "react";
import { useState } from "react";
import { superAddUser } from "../App";

export function SuperAddUser({ users, setUsers }: superAddUser): JSX.Element {
    const [name, setName] = useState<string>("");
    const [id, setId] = useState<number>(3);
    const [role, setRole] = useState<string>("");

    function addUser() {
        const newUser = { name, id, role };
        setUsers([...users, newUser]);
    }

    return (
        <>
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
        </>
    );
}
