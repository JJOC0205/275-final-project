import React from "react";
import { act, render, screen } from "@testing-library/react";
import { UserSelect } from "../components/UserSelect";
import { User } from "../interfaces/user";
import { UserListPair } from "../interfaces/UserListPair";
import userEvent from "@testing-library/user-event";

describe("UserSelect Tests", () => {
    const setUserMovies = jest.fn();
    const setUser = jest.fn();
    const setUsers = jest.fn();
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

    beforeEach(() =>
        render(
            <UserSelect
                users={users}
                setUserMovies={setUserMovies}
                userListPairs={userListPairs}
                setUser={setUser}
                setUsers={setUsers}
                userMovies={[]}
                currUser={users[0]}
            />
        )
    );

    test("Role Selector heading is present with the form", () => {
        expect(screen.getByText(/Role Selector:/i)).toBeInTheDocument();
    });

    test("Super User is the initial User", () => {
        expect(screen.getByText(/Super User/i)).toBeInTheDocument();
    });

    test("Can switch to the Admin Role", () => {
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "Administrator");
        expect(screen.getByText(/Administrator/i)).toBeInTheDocument();
    });

    test("Can switch roles more than once", () => {
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "User1");
        expect(screen.getByText(/User1/i)).toBeInTheDocument();
        userEvent.selectOptions(select, "User2");
        expect(screen.getByText(/User2/i)).toBeInTheDocument();
    });

    test("Selecting a User renders their own list", () => {
        const select = screen.getByRole("combobox");
        act(() => {
            userEvent.selectOptions(select, "User1");
        });

        expect(setUser).toHaveBeenCalledWith(users[2]); // Verify  setUser function called with the User1

        expect(setUserMovies).toHaveBeenCalledWith(userListPairs[0].userList); // verify setUserMovies called with  selected user list
    });
});
