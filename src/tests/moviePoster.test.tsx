import React from "react";
import { render, screen } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Movie } from "../interfaces/movie";
import { ShowMovieDetails } from "../components/moviePoster";

describe("moviePoster Tests", () => {
    const movie: Movie = {
        title: "Spider-Man",
        released: 2002,
        runtime: 121,
        watched: false,
        description:
            "After being bitten by a genetically-modified spider, a shy teenager gains spider-like abilities that he uses to fight injustice as a masked superhero and face a vengeful enemy.",
        rating: 0,
        genre: ["Action", "Adventure", "Sci-Fi"],
        poster: "https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg"
    };

    beforeEach(() => {
        render(
            <DndProvider backend={HTML5Backend}>
                <ShowMovieDetails movie={movie}></ShowMovieDetails>
            </DndProvider>
        );
    });

    test("The Movie's Image is present", () => {
        const img = screen.getByRole("moviePosterImage", { hidden: true });
        expect(img).toBeInTheDocument();
    });
});
