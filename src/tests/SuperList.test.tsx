import React from "react";
import { render, screen } from "@testing-library/react";
import { SuperList } from "../components/SuperList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Movie } from "../interfaces/movie";
import { User } from "../interfaces/user";
import testMovies from "../data/movies.json";

describe("SuperList Tests", () => {
    const superMovies: Movie[] = testMovies;

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

    test("Each Movie in the super list has their own remove button", () => {
        const removeButtons = screen.queryAllByRole("removeMovieButton");
        expect(removeButtons.length).toEqual(superMovies.length);
    });

    test("Remove Movie Button removes movie from Super List", () => {
        const removeButton = screen.queryAllByRole("removeMovieButton")[0];
        removeButton.click();
        const second = screen.queryAllByRole("superMovie")[0];
        second.click();
        // expect(
        //     screen.getByText(/StarWars 1: The Phantom Menace/i)
        // ).toBeInTheDocument();
        expect(screen.getByText(/Pride and Prejudice/i)).toBeInTheDocument();
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
