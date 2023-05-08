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
    setCilMovies,
    user
}: superMovies): JSX.Element {
    function removeMovie(movie: Movie) {
        const updatedMovies = superMovies.filter(
            (m) => m.title !== movie.title
        );
        setSuperMovies(updatedMovies);
        setCilMovies(updatedMovies);
    }

    const [movieDisplay, setMovieDisplay] = useState<Movie>({
        title: "Interstellar",
        released: 2014,
        runtime: 169,
        watched: false,
        description:
            "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        rating: 0,
        poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
    });

    const [title, setTitle] = useState<string>("");
    const [released, setReleased] = useState<number>(0);
    const [runtime, setRuntime] = useState<number>(0);
    const [watched, setWatched] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [poster, setPoster] = useState<string>("");

    // const [editMode, setEditMode] = useState<boolean>(false);

    function updateMovieDisplay(movie: Movie) {
        setMovieDisplay(movie);
        setTitle(movieDisplay.title);
        setReleased(movieDisplay.released);
        setRuntime(movieDisplay.runtime);
        setWatched(movieDisplay.watched);
        setDescription(movieDisplay.description);
        setRating(movieDisplay.rating);
        setPoster(movieDisplay.poster);
    }

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
        setCilMovies([...superMovies, newMovie]);
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

    function replaceMovieEdit() {
        const editedMovie = {
            title,
            released,
            runtime,
            watched,
            description,
            rating,
            poster
        };
        const updatedSuperList = superMovies.map((movie) => {
            if (movie.title === movieDisplay.title) {
                return editedMovie;
            }
            return movie;
        });
        setSuperMovies(updatedSuperList);
        setCilMovies(updatedSuperList);
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
                                width: "975px"
                            }}
                        >
                            {superMovies.map((movie: Movie) => (
                                <div
                                    key={movie.title}
                                    onClick={() => updateMovieDisplay(movie)}
                                >
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
                                type="checkbox"
                                checked={watched}
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
                                    Create New Movie
                                </button>
                                <button onClick={addMovie}>Add Movie</button>
                            </div>
                        </div>
                        <div
                            style={{
                                marginLeft: "25px",
                                backgroundColor: "darkred",
                                height: "325px",
                                border: "3px dotted lightgoldenrodyellow",
                                width: "530px",
                                padding: "15px",
                                overflow: "auto"
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
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
                                        Runtime in Minutes:{" "}
                                        {movieDisplay.runtime}
                                    </p>
                                    <p>
                                        Watched:{" "}
                                        {movieDisplay.watched.toString()}
                                    </p>
                                </div>
                            </div>
                            <p
                                style={{
                                    marginLeft: "25px",
                                    color: "whitesmoke"
                                }}
                            >
                                {movieDisplay.description}
                            </p>
                            <p
                                style={{
                                    marginLeft: "25px",
                                    color: "whitesmoke"
                                }}
                            >
                                Rating: {movieDisplay.rating}/10
                            </p>
                            {/* <button onClick={() => setEditMode(!editMode)}>
                                Edit Movie
                            </button> */}
                            <p>Edit Here</p>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter Title"
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="number"
                                value={released}
                                onChange={(e) =>
                                    setReleased(parseInt(e.target.value))
                                }
                                placeholder="Enter Release Date"
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="number"
                                value={runtime}
                                onChange={(e) =>
                                    setRuntime(parseInt(e.target.value))
                                }
                                placeholder="Enter Runtime (minutes)"
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="checkbox"
                                checked={watched}
                                onChange={(e) => setWatched(e.target.checked)}
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter Description"
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) =>
                                    setRating(parseInt(e.target.value))
                                }
                                placeholder="Enter Rating"
                                style={{ marginBottom: "5px" }}
                            />
                            <input
                                type="text"
                                value={poster}
                                onChange={(e) => setPoster(e.target.value)}
                                placeholder="Enter Poster URL"
                                style={{ marginBottom: "5px" }}
                            />
                            <button onClick={() => replaceMovieEdit()}>
                                Push Edited Movie
                            </button>
                        </div>
                    </div>
                </>
            ) : null}{" "}
        </div>
    );
}
