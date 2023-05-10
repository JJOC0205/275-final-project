import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { UserList } from "../components/UserList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Movie } from "../interfaces/movie";
import { User } from "../interfaces/user";
// import { UserListPair } from "../interfaces/UserListPair";

describe("UserList Tests", () => {
    const userMovies: Movie[] = [];
    const user: User = { name: "User1", id: 3, role: "user" };
    const userListPairs = [
        {
            username: "User1",
            userList: []
        },
        {
            username: "User2",
            userList: []
        }
    ];
    const setUserMovies = jest.fn();
    const setUserListPairs = jest.fn();
    beforeEach(() =>
        render(
            <DndProvider backend={HTML5Backend}>
                <UserList
                    userMovies={userMovies}
                    setUserMovies={setUserMovies}
                    user={user}
                    setUserListPairs={setUserListPairs}
                    userListPairs={userListPairs}
                ></UserList>
            </DndProvider>
        )
    );

    test("The User's username is visible", () => {
        expect(screen.getByText(/User1/i)).toBeInTheDocument();
    });

    test("Multiple buttons are with the list for sorting", () => {
        const filterButtons = screen.queryAllByRole("button");
        expect(filterButtons.length).toBeGreaterThan(0);
    });

    test("User Input for Editing Movies is present", () => {
        const filterInput = screen.queryAllByRole("textbox");
        expect(filterInput.length).toBeGreaterThan(0);
    });

    test("Initial Rating of 0/10 is visible on the right", () => {
        expect(screen.getByText(/Rating: 0/i)).toBeInTheDocument();
    });

    test("The UserList Drop Zone is present", () => {
        const dropZone = screen.getByTestId("movieDrop");
        expect(dropZone).toBeInTheDocument();
    });
});
