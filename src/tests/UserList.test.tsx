import React from "react";
import { render, screen } from "@testing-library/react";
import { UserList } from "../components/UserList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Movie } from "../interfaces/movie";
import { User } from "../interfaces/user";
// import { UserListPair } from "../interfaces/UserListPair";

describe("UserList Tests", () => {
    const userMovies: Movie[] = [
        {
            title: "The Dark Knight",
            released: 2008,
            runtime: 152,
            watched: false,
            description:
                "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            rating: 0,
            genre: ["Action", "Crime", "Drama", "Thriller"],
            poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
        }
    ];
    const user: User = { name: "User1", id: 3, role: "user" };
    const userListPairs = [
        {
            username: "User1",
            userList: [
                {
                    title: "The Dark Knight",
                    released: 2008,
                    runtime: 152,
                    watched: false,
                    description:
                        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                    rating: 0,
                    genre: ["Action", "Crime", "Drama", "Thriller"],
                    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
                }
            ]
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

    test("Clicking a movie will render the movie display", () => {
        const userMovie = screen.getByRole("userMovie");
        userMovie.click();
        const movieDisplayTitle = screen.getByTestId("displayTitle");
        expect(movieDisplayTitle.textContent).toEqual("The Dark Knight");
    });
});
