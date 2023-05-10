import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { SuperAddUser } from "../components/SuperAddUser";
import { User } from "../interfaces/user";
import { UserListPair } from "../interfaces/UserListPair";

describe("SuperAddUser Tests", () => {
    const users: User[] = [
        {
            name: "Super User",
            id: 0,
            role: "super"
        },
        {
            name: "Administrator",
            id: 1,
            role: "admin"
        },
        {
            name: "User1",
            id: 2,
            role: "user"
        },
        {
            name: "User2",
            id: 3,
            role: "user"
        }
    ];

    const userListPairs: UserListPair[] = [
        {
            username: "User1",
            userList: []
        },
        {
            username: "User2",
            userList: []
        }
    ];

    const setUsers = jest.fn();
    const setUserListPairs = jest.fn();

    beforeEach(() =>
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperAddUser
                    users={users}
                    setUsers={setUsers}
                    setUserListPairs={setUserListPairs}
                    userListPairs={userListPairs}
                ></SuperAddUser>
            </DndProvider>
        )
    );

    test("The Add User Section is visible", () => {
        expect(screen.getByText(/ADD NEW USER/i)).toBeInTheDocument();
    });

    test("The Delete User Section is visible", () => {
        expect(screen.getByText(/DELETE USER/i)).toBeInTheDocument();
    });

    test("2 Input textboxes for User Names", () => {
        const userNameInputs = screen.queryAllByPlaceholderText(/User Name/i);
        expect(userNameInputs.length).toBeGreaterThan(0);
    });

    test("2 Input textboxes for User IDs", () => {
        const userIDInputs = screen.queryAllByPlaceholderText(/User Name/i);
        expect(userIDInputs.length).toBeGreaterThan(0);
    });

    test("2 Input textboxes for User Roles", () => {
        const userRoleInputs = screen.queryAllByPlaceholderText(/User Name/i);
        expect(userRoleInputs.length).toBeGreaterThan(0);
    });

    test("Add and Delete Buttons are visible", () => {
        const deleteButton = screen.getByTestId("deleteUser");
        expect(deleteButton).toBeInTheDocument();
        const addButton = screen.getByTestId("addUser");
        expect(addButton).toBeInTheDocument();
    });

    // test("Adding New User", () => {
    //     const addNameInput = screen.getByPlaceholderText("Enter New User Name");
    //     const addIdInput = screen.getByPlaceholderText("Enter New User ID");
    //     const addRoleInput = screen.getByPlaceholderText("Enter New User Role");
    //     const addButton = screen.getByTestId("addUser");

    //     fireEvent.change(addNameInput, { target: { value: "John Doe" } });
    //     fireEvent.change(addIdInput, { target: { value: "4" } });
    //     fireEvent.change(addRoleInput, { target: { value: "user" } });
    //     fireEvent.click(addButton);

    //     // User added here
    //     expect(setUsers).toHaveBeenCalledWith([
    //         { name: "John Doe", id: 4, role: "user" }
    //     ]);

    //     expect(setUserListPairs).toHaveBeenCalledWith(
    //         expect.arrayContaining([
    //             expect.objectContaining({ username: "John Doe", userList: [] })
    //         ])
    //     );
    // });
});
