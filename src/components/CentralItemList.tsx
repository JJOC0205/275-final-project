import React from "react";
import { useState } from "react";
import { Movie } from "../interfaces/movie";
import { Stack } from "react-bootstrap";
import { ShowMovieDetails } from "./moviePoster";
import "./UserList.css";
import { cilMovies } from "../App";

const defaultMovie = {
    title: "DEFAULT MOVIE",
    released: 0,
    runtime: 0,
    watched: false,
    description: "Please CLICK any Movie",
    rating: 0,
    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    genre: ["None"]
};

export function CentralItemList({ cilMovies }: cilMovies): JSX.Element {
    const [movieDisplay, setMovieDisplay] = useState<Movie>(defaultMovie);
    const [searchTermD, setSearchTermD] = useState("");
    const [searchTermT, setSearchTermT] = useState("");
    const [searchTermG, setSearchTermG] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [minRuntime, setMinRuntime] = useState(0);

    function updateRating(rating: number) {
        if (!isNaN(rating)) {
            setMinRating(rating);
        } else {
            setMinRating(0);
        }
    }

    function updateRuntime(runtime: number) {
        if (!isNaN(runtime)) {
            setMinRuntime(runtime);
        } else {
            setMinRuntime(0);
        }
    }

    const filteredMovies = cilMovies.filter(
        (movie: Movie) =>
            movie.title
                .toLowerCase()
                .split(" ")
                .some((word) => word.includes(searchTermT.toLowerCase())) &&
            movie.description
                .toLowerCase()
                .split(" ")
                .some((word) => word.includes(searchTermD.toLowerCase())) &&
            movie.genre.some((genre) =>
                genre.toLowerCase().includes(searchTermG.toLowerCase())
            ) &&
            movie.rating >= minRating &&
            movie.runtime >= minRuntime
    );

    return (
        <>
            <h2 style={{ marginBottom: "25px", color: "gainsboro" }}>
                Click on a Movie to have its details displayed on the right.
            </h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "300px",
                        marginLeft: "40px",
                        backgroundColor: "lightgreen",
                        padding: "20px",
                        height: "300px"
                    }}
                >
                    <h4>Search Movies</h4>
                    <input
                        type="text"
                        placeholder="Search by movie description"
                        onChange={(e) => setSearchTermD(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    />
                    <input
                        type="text"
                        placeholder="Search by movie title"
                        onChange={(e) => setSearchTermT(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    />
                    <input
                        type="text"
                        placeholder="Search by movie genre"
                        onChange={(e) => setSearchTermG(e.target.value)}
                        style={{ marginBottom: "10px" }}
                    />
                    <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        placeholder="Minimum rating"
                        onChange={(e) =>
                            updateRating(parseFloat(e.target.value))
                        }
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                    />
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        placeholder="Minimum runtime (in minutes)"
                        onChange={(e) =>
                            updateRuntime(parseInt(e.target.value))
                        }
                        style={{ marginBottom: "10px", marginLeft: "10px" }}
                    />
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Stack
                        direction="horizontal"
                        gap={4}
                        style={{
                            marginLeft: "30px",
                            backgroundColor: "powderblue",
                            padding: "25px",
                            overflow: "auto",
                            width: "950px",
                            height: "300px"
                        }}
                    >
                        {filteredMovies.map((movie: Movie, index) => (
                            <div
                                key={index}
                                role="CIL-Element"
                                onClick={() => setMovieDisplay(movie)}
                            >
                                <ShowMovieDetails
                                    movie={movie}
                                ></ShowMovieDetails>
                            </div>
                        ))}
                    </Stack>
                    <div
                        role="CIL"
                        style={{
                            marginLeft: "25px",
                            backgroundColor: "darkslateblue",
                            height: "300px",
                            border: "3px dotted lightgreen",
                            width: "530px",
                            padding: "15px",
                            overflow: "auto"
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <img
                                style={{ marginLeft: "20px" }}
                                src={movieDisplay.poster}
                                alt={movieDisplay.title}
                                width="150px"
                                height="150px"
                            ></img>
                            <div
                                style={{
                                    marginLeft: "25px",
                                    color: "whitesmoke"
                                }}
                            >
                                <p>{movieDisplay.title}</p>
                                <p>Release Date: {movieDisplay.released}</p>
                                <p>
                                    Runtime in Minutes: {movieDisplay.runtime}
                                </p>
                                <p>
                                    Watched: {movieDisplay.watched.toString()}
                                </p>
                            </div>
                        </div>
                        <p style={{ marginLeft: "25px", color: "whitesmoke" }}>
                            {movieDisplay.genre.map((genre) => genre + ", ")}
                        </p>
                        <p style={{ marginLeft: "25px", color: "whitesmoke" }}>
                            {movieDisplay.description}
                        </p>
                        <p style={{ marginLeft: "25px", color: "whitesmoke" }}>
                            Rating: {movieDisplay.rating}/10
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
