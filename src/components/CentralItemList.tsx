import React from "react";
import { useState } from "react";
import { Movie } from "../interfaces/movie";
import { Stack } from "react-bootstrap";
import { ShowMovieDetails } from "./moviePoster";
import { EditMode } from "./EditUserMode";
// import testMovies from "../data/movies.json";
import "./UserList.css";
// import { superMovies } from "./SuperList";
import { cilMovies } from "../App";

export function CentralItemList({ cilMovies }: cilMovies): JSX.Element {
    const [movieDisplay, setMovieDisplay] = useState<Movie>(cilMovies[6]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [minRuntime, setMinRuntime] = useState(0);

    const filteredMovies = cilMovies.filter(
        (movie: Movie) =>
            movie.description
                .toLowerCase()
                .split(" ")
                .some((word) => word.includes(searchTerm.toLowerCase())) &&
            movie.rating >= minRating &&
            movie.runtime >= minRuntime
    );

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Stack
                    direction="horizontal"
                    gap={3}
                    style={{
                        marginLeft: "30px",
                        backgroundColor: "lightseagreen",
                        padding: "10px",
                        overflow: "auto",
                        width: "1300px"
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <input
                            type="text"
                            placeholder="Search by movie title or description"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ marginBottom: "10px" }}
                        />
                        <input
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            placeholder="Minimum rating"
                            onChange={(e) =>
                                setMinRating(parseFloat(e.target.value))
                            }
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                        />
                        <input
                            type="number"
                            min="0"
                            max="1000"
                            placeholder="Minimum runtime (in minutes)"
                            onChange={(e) =>
                                setMinRuntime(parseInt(e.target.value))
                            }
                            style={{ marginBottom: "10px", marginLeft: "10px" }}
                        />
                    </div>
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie: Movie) => (
                            <div
                                key={movie.title}
                                onClick={() => setMovieDisplay(movie)}
                            >
                                <ShowMovieDetails
                                    movie={movie}
                                ></ShowMovieDetails>
                                <EditMode movie={movie}></EditMode>
                            </div>
                        ))
                    ) : (
                        <p>Current search does not match any results</p>
                    )}
                </Stack>
                <div
                    style={{
                        marginLeft: "25px",
                        backgroundColor: "darkslateblue",
                        height: "325px",
                        border: "3px dotted lightgreen",
                        width: "530px",
                        padding: "15px"
                    }}
                >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img
                            src={movieDisplay.poster}
                            alt={movieDisplay.title}
                            width="150px"
                            height="150px"
                        ></img>
                        <div
                            style={{ marginLeft: "25px", color: "whitesmoke" }}
                        >
                            <p>{movieDisplay.title}</p>
                            <p>Release Date: {movieDisplay.released}</p>
                            <p>Runtime in Minutes: {movieDisplay.runtime}</p>
                            <p>Watched: {movieDisplay.watched.toString()}</p>
                        </div>
                    </div>
                    <p style={{ marginLeft: "25px", color: "whitesmoke" }}>
                        {movieDisplay.description}
                    </p>
                    <p style={{ marginLeft: "25px", color: "whitesmoke" }}>
                        Rating: {movieDisplay.rating}/10
                    </p>
                </div>
            </div>
        </>
    );
}
