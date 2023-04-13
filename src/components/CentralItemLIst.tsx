import React from "react";
import { Movie } from "../interfaces/movie";
import { Stack } from "react-bootstrap";

export function CentralItemList({ movies }: { movies: Movie[] }): JSX.Element {
    return (
        <Stack gap={3}>
            {movies.map((movie: Movie) => (
                <div key={movie.title}>{movie.title}</div>
            ))}
        </Stack>
    );
}
