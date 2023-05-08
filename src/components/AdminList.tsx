import React from "react";
import { useState } from "react";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
import testMovies from "../data/movies.json";
import { ShowMovieDetails } from "./moviePoster";
import { Stack } from "react-bootstrap";
import { MovieTypes } from "../interfaces/MovieTypes";
import { useDrop } from "react-dnd";
import { adminMovies } from "../App";

export function AdminList({
    adminMovies,
    setAdminMovies,
    setCilMovies,
    user,
    cilMovies
}: adminMovies): JSX.Element {
    function updateAdminMovies(newMovie: Movie) {
        const movieExists = adminMovies.some(
            (movie) => movie.title === newMovie.title
        );
        if (!movieExists) {
            const movieFilter = testMovies.filter(
                (movie) => newMovie.title === movie.title
            );
            newMovie.poster = movieFilter[0].poster;
            setAdminMovies([...adminMovies, newMovie]);
        }
    }
    const [{ isOver }, drop] = useDrop({
        accept: MovieTypes.MOVIE,
        drop: (item: Movie) => updateAdminMovies(item),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

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
    function updateMovieDisplay(movie: Movie) {
        setMovieDisplay(movie);
        setTitle(movie.title);
        setReleased(movie.released);
        setRuntime(movie.runtime);
        setWatched(movie.watched);
        setDescription(movie.description);
        setRating(movie.rating);
        setPoster(movie.poster);
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
    }
    return (
        <div>
            {user.role === "admin" ? (
                <>
                    <h2>Admin List</h2>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Stack
                            direction="horizontal"
                            ref={drop}
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
                            {adminMovies.map((movie: Movie) => (
                                <div
                                    key={movie.title}
                                    onClick={() => updateMovieDisplay(movie)}
                                >
                                    <ShowMovieDetails
                                        movie={movie}
                                    ></ShowMovieDetails>
                                </div>
                            ))}
                        </Stack>
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
