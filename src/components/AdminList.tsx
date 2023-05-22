import React from "react";
import { useState } from "react";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
// import testMovies from "../data/movies.json";
import { ShowMovieDetails } from "./moviePoster";
import { Stack } from "react-bootstrap";
import { MovieTypes } from "../interfaces/MovieTypes";
import { useDrop } from "react-dnd";
import { adminMovies } from "../App";

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

export function AdminList({
    adminMovies,
    setAdminMovies,
    setCilMovies,
    user,
    cilMovies,
    setSuperMovies
}: adminMovies): JSX.Element {
    function updateAdminMovies(newMovie: Movie) {
        const movieExists = adminMovies.some(
            (movie) => movie.title === newMovie.title
        );
        // if (!movieExists) {
        //     const movieFilter = testMovies.filter(
        //         (movie) => newMovie.title === movie.title
        //     );
        //     newMovie.poster = movieFilter[0].poster;
        //     setAdminMovies([...adminMovies, newMovie]);
        // }
        if (!movieExists) {
            setAdminMovies([...adminMovies, newMovie]);
        }
        console.log(adminMovies.length);
    }

    function removeMovie(movie: Movie) {
        const adminCopy = [...adminMovies];
        const updatedMovies = adminCopy.filter((m) => m.title !== movie.title);
        setAdminMovies(updatedMovies);
    }

    const [, drop] = useDrop({
        accept: MovieTypes.MOVIE,
        drop: (item: Movie) => updateAdminMovies(item),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

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

    const [genreInput, setGenreInput] = useState<string>("");

    function updateGenreInput(event: React.ChangeEvent<HTMLInputElement>) {
        setGenreInput(event.target.value);
    }

    function addGenre() {
        if (genreInput && !genre.includes(genreInput)) {
            setGenre([...genre, genreInput]);
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
            genre
        };
        const updatedSuperList = adminMovies.map((movie) => {
            if (movie.title === movieDisplay.title) {
                return editedMovie;
            }
            return movie;
        });
        const updatedCILList = cilMovies.map((movie) => {
            if (movie.title === movieDisplay.title) {
                return editedMovie;
            }
            return movie;
        });
        setAdminMovies(updatedSuperList);
        setCilMovies(updatedCILList);
        setSuperMovies(updatedCILList);
        updateMovieDisplay(editedMovie);
    }

    return (
        <div>
            {user.role === "admin" ? (
                <>
                    <h2
                        style={{
                            textAlign: "left",
                            marginLeft: "225px",
                            color: "gainsboro",
                            marginBottom: "20px"
                        }}
                    >
                        {user.name}: Edit CIL movies by changing their
                        attributes.
                    </h2>
                    <h3 style={{ color: "lightcyan", marginBottom: "20px" }}>
                        Drag movies, click any movie poster{" "}
                        <span style={{ color: "orange" }}>before</span> viewing
                        and editing the movie on the right.
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: "25px"
                        }}
                    >
                        <Stack
                            role="adminList"
                            direction="horizontal"
                            ref={drop}
                            gap={4}
                            style={{
                                marginLeft: "30px",
                                marginRight: "30px",
                                backgroundColor: "lightgoldenrodyellow",
                                padding: "10px",
                                overflow: "auto",
                                width: "975px",
                                height: "300px"
                            }}
                        >
                            {adminMovies.map((movie: Movie, index) => (
                                <div
                                    role="adminMovie"
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
                                            backgroundColor: "orange",
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
                            role="movieDisplay"
                            style={{
                                marginLeft: "25px",
                                backgroundColor: "blanchedalmond",
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
