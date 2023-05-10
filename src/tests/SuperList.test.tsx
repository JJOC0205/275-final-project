import React from "react";
import { render, screen } from "@testing-library/react";
import { SuperList } from "../components/SuperList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Movie } from "../interfaces/movie";
import { User } from "../interfaces/user";

describe("SuperList Tests", () => {
    const superMovies: Movie[] = [
        {
            title: "KGF 2",
            released: 2022,
            runtime: 168,
            watched: false,
            description:
                "Bad boy vs Powerful Government vs Winning a Girls Heart",
            rating: 0,
            genre: ["Action", "Crime", "Drama", "Thriller"],
            poster: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/66ab0972-ff05-4650-9a8e-975bf16fe079/df3fxnw-f2efb7aa-086d-4a92-8294-9b3d499180d7.jpg/v1/fill/w_1280,h_1897,q_75,strp/kgf_chapter_2_poster_by_tyrionchandu_df3fxnw-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTg5NyIsInBhdGgiOiJcL2ZcLzY2YWIwOTcyLWZmMDUtNDY1MC05YThlLTk3NWJmMTZmZTA3OVwvZGYzZnhudy1mMmVmYjdhYS0wODZkLTRhOTItODI5NC05YjNkNDk5MTgwZDcuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.qPAKbbTXnfh-CYEzxsKJpJ0N_SkMOxCyogHwJSaLAlU"
        },
        {
            title: "Dhoom 2",
            released: 2006,
            runtime: 152,
            watched: false,
            description:
                "A solo thief takes on a new partner, can he trust her?",
            rating: 0,
            genre: [],
            poster: "https://upload.wikimedia.org/wikipedia/en/1/13/Dhoom_2_%282006_film%29_poster.jpg"
        },
        {
            title: "Spider-Man",
            released: 2002,
            runtime: 121,
            watched: false,
            description:
                "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.",
            rating: 0,
            genre: ["Action", "Adventure", "Sci-Fi"],
            poster: "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg"
        },
        {
            title: "X-Men: Days of Future Past",
            released: 2014,
            runtime: 132,
            watched: false,
            description:
                "The X-Men send Wolverine to the past in a desperate effort to change history and prevent an event that results in doom for both humans and mutants.",
            rating: 0,
            genre: ["Action", "Adventure", "Sci-Fi", "Thriller"],
            poster: "https://m.media-amazon.com/images/M/MV5BNjk3MGZhMjEtOTM4NC00NzE2LTk2NzctZDc4YTUwN2E3NDhhXkEyXkFqcGdeQXVyNDc2NjEyMw@@._V1_.jpg"
        },
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

    const user: User = { name: "Super User", id: 0, role: "super" };

    const setSuperMovies = jest.fn();
    const setCilMovies = jest.fn();

    beforeEach(() =>
        render(
            <DndProvider backend={HTML5Backend}>
                <SuperList
                    superMovies={superMovies}
                    user={user}
                    setSuperMovies={setSuperMovies}
                    setCilMovies={setCilMovies}
                ></SuperList>
            </DndProvider>
        )
    );

    test("The Super User's name is visible", () => {
        expect(screen.getByText(/Super User/i)).toBeInTheDocument();
    });

    test("Multiple buttons for removing movies are present", () => {
        const removeButtons = screen.queryAllByRole("removeMovie");
        expect(removeButtons.length).toBeGreaterThan(0);
    });

    test("Input forms for creating movies are present", () => {
        const inputForms = screen.queryAllByRole("createMovie");
        expect(inputForms.length).toBeGreaterThan(0);
    });

    test("Edit Movie and Create Movie Labels are visible", () => {
        expect(screen.getByText(/Edit Movie Here:/i)).toBeInTheDocument();
        expect(screen.getByText(/Create New Movie:/i)).toBeInTheDocument();
    });

    test("Create and Add Movie buttons are present", () => {
        const addButton = screen.getByRole("addNewMovie");
        expect(addButton).toBeInTheDocument();
        const createButton = screen.getByRole("createNewMovie");
        expect(createButton).toBeInTheDocument();
    });

    test("Add/Remove Genre and Push Changes Buttons are present", () => {
        const addGenre = screen.getByRole("addGenre");
        expect(addGenre).toBeInTheDocument();
        const removeGenre = screen.getByRole("removeGenre");
        expect(removeGenre).toBeInTheDocument();
        const pushMovie = screen.getByRole("pushMovie");
        expect(pushMovie).toBeInTheDocument();
    });
});
