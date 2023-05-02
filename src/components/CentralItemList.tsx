import React from "react";
import { Movie } from "../interfaces/movie";
import { Stack } from "react-bootstrap";
import { User } from "../interfaces/user";
import { ShowMovieDetails } from "./moviePoster";
import { EditMode } from "./EditUserMode";
//import { MOVIES } from "../data/MovieList";

export function CentralItemList({
    movies,
    user
}: {
    movies: Movie[];
    user: User;
}): JSX.Element {
    return (
        <Stack direction="horizontal" gap={3}>
            {movies.map((movie: Movie) => (
                <div key={movie.title} className="bg-light-border">
                    <ShowMovieDetails movie={movie}></ShowMovieDetails>
                    <EditMode movie={movie} user={user}></EditMode>
                </div>
            ))}
        </Stack>
    );
}
