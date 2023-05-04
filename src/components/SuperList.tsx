import React from "react";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
import { ShowMovieDetails } from "./moviePoster";
import { Stack } from "react-bootstrap";
import { superMovies } from "../App";

export function SuperList({
    superMovies,
    setSuperMovies
}: superMovies): JSX.Element {
    function removeMovie(movie: Movie) {
        const updatedMovies = superMovies.filter(
            (m) => m.title !== movie.title
        );
        setSuperMovies(updatedMovies);
    }

    return (
        <>
            <h2>Super List</h2>
            <Stack
                direction="horizontal"
                gap={3}
                style={{
                    marginLeft: "30px",
                    backgroundColor: "lightskyblue",
                    padding: "10px",
                    overflow: "auto",
                    width: "1300px"
                }}
            >
                {superMovies.map((movie: Movie) => (
                    <div key={movie.title}>
                        <ShowMovieDetails movie={movie}></ShowMovieDetails>
                        <button
                            style={{
                                height: "30px",
                                width: "75px",
                                backgroundColor: "lightsalmon",
                                marginTop: "10px"
                            }}
                            onClick={() => removeMovie(movie)}
                        >
                            Remove
                        </button>
                        {/* <EditMode movie={movie}></EditMode> */}
                    </div>
                ))}
            </Stack>
        </>
    );
}
