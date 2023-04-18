import React from "react";
import { Movie } from "../interfaces/movie";
import { Stack } from "react-bootstrap";
import { ShowMovieDetails } from "./moviePoster";
import { EditMode } from "./EditUserMode";

export function CentralItemList({ movies }: { movies: Movie[] }): JSX.Element {
    return (
        <Stack direction="horizontal" gap={3}>
            {movies.map((movie: Movie) => (
                <div key={movie.title} className="bg-light-border">
                    <ShowMovieDetails movie={movie}></ShowMovieDetails>
                    <EditMode movie={movie}></EditMode>
                </div>
            ))}
        </Stack>
    );
}
