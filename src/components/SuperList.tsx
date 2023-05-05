import React from "react";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
import { ShowMovieDetails } from "./moviePoster";
import { Stack } from "react-bootstrap";
import { superMovies } from "../App";
import { useState } from "react";

export function SuperList({
    superMovies,
    setSuperMovies,
    user
}: superMovies): JSX.Element {
    function removeMovie(movie: Movie) {
        const updatedMovies = superMovies.filter(
            (m) => m.title !== movie.title
        );
        setSuperMovies(updatedMovies);
    }

    const [title, setTitle] = useState<string>("");
    const [released, setReleased] = useState<number>(0);
    const [runtime, setRuntime] = useState<number>(0);
    const [watched, setWatched] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [poster, setPoster] = useState<string>("");

    const [newMovie, setNewMovie] = useState<Movie>({
        title: "",
        released: 0,
        runtime: 0,
        watched: false,
        description: "",
        rating: 0,
        poster: ""
    });

    function addMovie() {
        setSuperMovies([...superMovies, newMovie]);
        setNewMovie({
            title: "",
            released: 0,
            runtime: 0,
            watched: false,
            description: "",
            rating: 0,
            poster: ""
        });
    }

    function createNewMovie() {
        const newMovie = {
            title,
            released,
            runtime,
            watched,
            description,
            rating,
            poster
        };
        setNewMovie(newMovie);
    }

    return (
        <div>
            {user.role === "super" ? (
                <>
                    <h2>Super List</h2>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Stack
                            direction="horizontal"
                            gap={3}
                            style={{
                                marginLeft: "30px",
                                marginRight: "30px",
                                backgroundColor: "lightskyblue",
                                padding: "10px",
                                overflow: "auto",
                                width: "1300px"
                            }}
                        >
                            {superMovies.map((movie: Movie) => (
                                <div key={movie.title}>
                                    <ShowMovieDetails
                                        movie={movie}
                                    ></ShowMovieDetails>
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
                                </div>
                            ))}
                        </Stack>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "300px"
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Enter Title"
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="number"
                                placeholder="Enter Release Date"
                                onChange={(e) =>
                                    setReleased(parseInt(e.target.value))
                                }
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="number"
                                placeholder="Enter Runtime (minutes)"
                                onChange={(e) =>
                                    setRuntime(parseInt(e.target.value))
                                }
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="text"
                                placeholder="Enter 'true' if watched, 'false' if not"
                                onChange={(e) => setWatched(e.target.checked)}
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="text"
                                placeholder="Enter Description"
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="number"
                                placeholder="Enter Rating"
                                onChange={(e) =>
                                    setRating(parseInt(e.target.value))
                                }
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="text"
                                placeholder="Enter Poster url"
                                onChange={(e) => setPoster(e.target.value)}
                                style={{ marginBottom: "5px" }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center"
                                }}
                            >
                                <button onClick={createNewMovie}>
                                    Create Movie
                                </button>
                                <button onClick={addMovie}>Add Movie</button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}{" "}
        </div>
    );
}
