import React from "react";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
import { ShowMovieDetails } from "./moviePoster";
import { Stack } from "react-bootstrap";
import { superMovies } from "../App";
import { useState } from "react";

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

export function SuperList({
    superMovies,
    setSuperMovies,
    setCilMovies,
    user
}: superMovies): JSX.Element {
    function removeMovie(movie: Movie) {
        const superCopy = [...superMovies];
        const updatedMovies = superCopy.filter((m) => m.title !== movie.title);
        setSuperMovies(updatedMovies);
        setCilMovies(updatedMovies);
    }

    const [movieDisplay, setMovieDisplay] = useState<Movie>(defaultMovie);

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
        genre: ["No Genre Yet"]
    });

    function addMovie() {
        if (isNaN(released) || isNaN(runtime) || isNaN(rating)) {
            return;
        }
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
        if (isNaN(released) || isNaN(runtime) || isNaN(rating)) {
            return;
        }
        const newMovie = {
            title: title,
            released: released,
            runtime: runtime,
            watched: watched,
            description: description,
            rating: rating,
            poster: poster,
            genre: ["No Genre Yet"]
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
        if (genre.length > 1) {
            const updatedGenre = genre.filter((item) => item !== genreToRemove);
            setGenre(updatedGenre);
            setGenreInput("");
        }
    }

    function replaceMovieEdit() {
        if (isNaN(released) || isNaN(runtime) || isNaN(rating)) {
            return;
        }
        const editedMovie = {
            title,
            released,
            runtime,
            watched,
            description,
            rating,
            poster,
            genre: [...genre]
        };
        const updatedSuperList = superMovies.map((movie) => {
            if (movie.title === movieDisplay.title) {
                return editedMovie;
            }
            return movie;
        });
        setSuperMovies(updatedSuperList);
        setCilMovies(updatedSuperList);
        updateMovieDisplay(editedMovie);
    }

    return (
        <div>
            {user.role === "super" ? (
                <>
                    <h2
                        style={{
                            textAlign: "left",
                            marginLeft: "50px",
                            color: "gainsboro",
                            marginBottom: "20px"
                        }}
                    >
                        {user.name}: Control the composition of the Central Item
                        List (create/delete/edit movies)
                    </h2>
                    <h3 style={{ color: "lightcyan" }}>
                        Click any movie poster{" "}
                        <span style={{ color: "orange" }}>First</span> to edit
                        the movie on the right.
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: "25px"
                        }}
                    >
                        <Stack /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////SUPER LIST STARTS
                            direction="horizontal"
                            gap={4}
                            style={{
                                marginLeft: "30px",
                                marginRight: "30px",
                                backgroundColor: "lightskyblue",
                                padding: "25px",
                                overflow: "auto",
                                width: "975px",
                                height: "300px"
                            }}
                        >
                            {superMovies.map((movie: Movie, index) => (
                                <div
                                    role="superMovie"
                                    // key={movie.title}
                                    key={index}
                                    onClick={() => updateMovieDisplay(movie)}
                                >
                                    <ShowMovieDetails
                                        movie={movie}
                                    ></ShowMovieDetails>
                                    <button
                                        role="removeMovieButton"
                                        style={{
                                            height: "30px",
                                            width: "75px",
                                            backgroundColor: "lightyellow",
                                            marginTop: "10px"
                                        }}
                                        onClick={() => removeMovie(movie)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </Stack>
                        <div /////////////////////////////////////////////////////////////////////////////////////////////////////////CREATE MOVIE STARTS
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
                            <h4>Create New Movie:</h4>
                            <input
                                role="createMovie"
                                type="text"
                                placeholder="Enter Title"
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ marginBottom: "5px" }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <h5>Enter Release Year:</h5>
                                <input
                                    type="number"
                                    value={released}
                                    onChange={(e) =>
                                        setReleased(parseInt(e.target.value))
                                    }
                                    placeholder="Enter Release Year"
                                    style={{
                                        marginBottom: "5px",
                                        width: "75px",
                                        marginLeft: "15px"
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <h5>Enter Runtime:</h5>
                                <input
                                    type="number"
                                    value={runtime}
                                    onChange={(e) =>
                                        setRuntime(parseInt(e.target.value))
                                    }
                                    placeholder="Enter Runtime (minutes)"
                                    style={{
                                        marginBottom: "5px",
                                        width: "75px",
                                        marginLeft: "50px"
                                    }}
                                />
                            </div>
                            <div
                                role="createMovie"
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "left",
                                    marginBottom: "10px"
                                }}
                            >
                                <h5>Check if Watched:</h5>
                                <input
                                    role="createMovie"
                                    type="checkbox"
                                    checked={watched}
                                    onChange={(e) =>
                                        setWatched(e.target.checked)
                                    }
                                    style={{
                                        marginBottom: "5px",
                                        marginLeft: "25px"
                                    }}
                                />
                            </div>
                            <input
                                role="createMovie"
                                type="text"
                                placeholder="Enter Description"
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ marginBottom: "5px" }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <h5>Enter Rating:</h5>
                                <input
                                    type="number"
                                    value={rating}
                                    onChange={(e) =>
                                        setRating(parseInt(e.target.value))
                                    }
                                    placeholder="Enter Rating"
                                    style={{
                                        marginBottom: "5px",
                                        width: "75px",
                                        marginLeft: "65px"
                                    }}
                                />
                            </div>
                            <input
                                role="createMovie"
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
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}
                                >
                                    <button
                                        role="createNewMovie"
                                        onClick={() => createNewMovie()}
                                    >
                                        Create New Movie
                                    </button>
                                    <button
                                        role="addNewMovie"
                                        onClick={() => addMovie()}
                                    >
                                        Add To CIL
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div ////////////////////////////////////////////////////////////////////////////////////////////////////////MOVIE DISPLAY STARTS
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
                                    <p data-testid="displayTitle">
                                        {movieDisplay.title}
                                    </p>
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
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}
                                >
                                    <h5>Title: </h5>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        placeholder="Enter Title"
                                        style={{
                                            marginBottom: "5px",
                                            width: "300px",
                                            marginLeft: "20px"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}
                                >
                                    <h5>Release Year: </h5>
                                    <input
                                        type="number"
                                        value={released}
                                        onChange={(e) =>
                                            setReleased(
                                                parseInt(e.target.value)
                                            )
                                        }
                                        placeholder="Enter Release Date"
                                        style={{
                                            marginBottom: "5px",
                                            width: "300px",
                                            marginLeft: "20px"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}
                                >
                                    <h5>Runtime: </h5>
                                    <input
                                        type="number"
                                        value={runtime}
                                        onChange={(e) =>
                                            setRuntime(parseInt(e.target.value))
                                        }
                                        placeholder="Enter Runtime (minutes)"
                                        style={{
                                            marginBottom: "5px",
                                            width: "300px",
                                            marginLeft: "20px"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "left",
                                        marginBottom: "5px",
                                        marginLeft: "30px"
                                    }}
                                >
                                    <h5>Check if Watched: </h5>
                                    <input
                                        type="checkbox"
                                        checked={watched}
                                        onChange={(e) =>
                                            setWatched(e.target.checked)
                                        }
                                        style={{
                                            marginLeft: "10px"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}
                                >
                                    <h5>Description: </h5>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        placeholder="Enter Description"
                                        style={{
                                            marginBottom: "5px",
                                            width: "300px",
                                            marginLeft: "20px"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}
                                >
                                    <h5>Rating: </h5>
                                    <input
                                        type="number"
                                        value={rating}
                                        onChange={(e) =>
                                            setRating(parseInt(e.target.value))
                                        }
                                        placeholder="Enter Rating"
                                        style={{
                                            marginBottom: "5px",
                                            width: "300px",
                                            marginLeft: "20px"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center"
                                    }}
                                >
                                    <h5>Poster URL: </h5>
                                    <input
                                        type="text"
                                        value={poster}
                                        onChange={(e) =>
                                            setPoster(e.target.value)
                                        }
                                        placeholder="Enter Poster URL"
                                        style={{
                                            marginBottom: "5px",
                                            width: "300px",
                                            marginLeft: "20px"
                                        }}
                                    />
                                </div>
                            </div>
                            <input
                                type="text"
                                value={genreInput}
                                onChange={updateGenreInput}
                                placeholder="Enter Genre to Add"
                                style={{ marginBottom: "5px" }}
                            />
                            <button role="addGenre" onClick={addGenre}>
                                Add Genre
                            </button>
                            <input
                                type="text"
                                value={genreInput}
                                onChange={updateGenreInput}
                                placeholder="Enter Genre to Remove"
                                style={{ marginBottom: "5px" }}
                            />
                            <button
                                role="removeGenre"
                                onClick={() => removeGenre(genreInput)}
                            >
                                Remove Genre
                            </button>
                            <hr></hr>
                            <button
                                role="pushMovie"
                                onClick={() => replaceMovieEdit()}
                            >
                                Push Edited Movie
                            </button>
                        </div>
                    </div>
                </>
            ) : null}{" "}
        </div>
    );
}
