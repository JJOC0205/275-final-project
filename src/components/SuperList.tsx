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
        poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        genre: ["Adventure", "Drama", "Sci-Fi"]
    });

    const [title, setTitle] = useState<string>("");
    const [released, setReleased] = useState<number>(0);
    const [runtime, setRuntime] = useState<number>(0);
    const [watched, setWatched] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [poster, setPoster] = useState<string>("");
    const [genre, setGenre] = useState<string[]>([]);

    function updateMovieDisplay(movie: Movie) {
        setMovieDisplay(movie);
        setTitle(movie.title);
        setReleased(movie.released);
        setRuntime(movie.runtime);
        setWatched(movie.watched);
        setDescription(movie.description);
        setRating(movie.rating);
        setPoster(movie.poster);
        setGenre(movie.genre);
    }

    const [newMovie, setNewMovie] = useState<Movie>({
        title: "",
        released: 0,
        runtime: 0,
        watched: false,
        description: "",
        rating: 0,
        poster: "",
        genre: []
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
            poster: "",
            genre: []
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
            poster,
            genre: [...genre]
        };
        setNewMovie(newMovie);
    }

    const [genreInput, setGenreInput] = useState<string>("");

    function updateGenreInput(event: React.ChangeEvent<HTMLInputElement>) {
        setGenreInput(event.target.value);
    }

    function addGenre() {
        if (genreInput && !genre.includes(genreInput)) {
            setGenre((prevGenre) => [...prevGenre, genreInput]);
            setGenreInput("");
        }
    }

    function removeGenre(genreToRemove: string) {
        const updatedGenre = genre.filter((item) => item !== genreToRemove);
        setGenre(updatedGenre);
        setGenreInput("");
    }

    function replaceMovieEdit() {
        const editedMovie = {
            title,
            released,
            runtime,
            watched,
            description,
            rating,
            poster,
            genre
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
                    <h2
                        style={{
                            textAlign: "left",
                            marginLeft: "50px",
                            color: "gainsboro"
                        }}
                    >
                        Super User
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "25px"
                        }}
                    >
                        <Stack
                            direction="horizontal"
                            gap={4}
                            style={{
                                marginLeft: "30px",
                                marginRight: "30px",
                                backgroundColor: "lightskyblue",
                                padding: "10px",
                                overflow: "auto",
                                width: "975px",
                                height: "300px"
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
                                width: "300px",
                                backgroundColor: "lightsteelblue",
                                padding: "20px",
                                height: "300px",
                                overflow: "auto"
                            }}
                        >
                            <h4>Create New Movie</h4>
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
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    marginBottom: "10px"
                                }}
                            >
                                Check if Watched:
                                <input
                                    type="checkbox"
                                    checked={watched}
                                    onChange={(e) =>
                                        setWatched(e.target.checked)
                                    }
                                    style={{
                                        marginBottom: "5px",
                                        marginLeft: "10px"
                                    }}
                                />
                            </div>
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
                                backgroundColor: "coral",
                                height: "300px",
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
                                        marginLeft: "25px"
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
                                    marginLeft: "25px"
                                }}
                            >
                                {movieDisplay.genre.map(
                                    (genre) => genre + ", "
                                )}
                            </p>
                            <p
                                style={{
                                    marginLeft: "25px"
                                }}
                            >
                                {movieDisplay.description}
                            </p>
                            <p
                                style={{
                                    marginLeft: "25px"
                                }}
                            >
                                Rating: {movieDisplay.rating}/10
                            </p>
                            <hr></hr>
                            <h4>Edit Movie Here:</h4>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column"
                                }}
                            >
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
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        marginBottom: "10px"
                                    }}
                                >
                                    Check if Watched:
                                    <input
                                        type="checkbox"
                                        checked={watched}
                                        onChange={(e) =>
                                            setWatched(e.target.checked)
                                        }
                                        style={{
                                            marginBottom: "5px",
                                            marginLeft: "10px"
                                        }}
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
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
                            </div>
                            <input
                                type="text"
                                value={genreInput}
                                onChange={updateGenreInput}
                                placeholder="Enter Genre to Add"
                                style={{ marginBottom: "5px" }}
                            />
                            <button onClick={addGenre}>Add Genre</button>
                            <input
                                type="text"
                                value={genreInput}
                                onChange={updateGenreInput}
                                placeholder="Enter Genre to Remove"
                                style={{ marginBottom: "5px" }}
                            />
                            <button onClick={() => removeGenre(genreInput)}>
                                Remove Genre
                            </button>
                            <hr></hr>
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
