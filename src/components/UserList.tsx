import React from "react";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { MovieTypes } from "../interfaces/MovieTypes";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
import { ShowMovieDetails } from "./moviePoster";
import { userMovies } from "../App";

export function UserList({
    userMovies,
    setUserMovies,
    user,
    setUserListPairs,
    userListPairs
}: userMovies): JSX.Element {
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

    function updateMovieDisplay(movie: Movie) {
        setMovieDisplay(movie);
        setWatched(movie.watched);
        setRating(movie.rating);
        setGenre(movie.genre);
    }

    const [rating, setRating] = useState<number>(movieDisplay.rating);
    const [genre, setGenre] = useState<string[]>(movieDisplay.genre);
    const [watched, setWatched] = useState<boolean>(false);

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
        const updatedGenre = genre.filter((item) => item !== genreToRemove);
        setGenre(updatedGenre);
        setGenreInput("");
    }

    function replaceMovieEdit() {
        const editedMovie = {
            title: movieDisplay.title,
            released: movieDisplay.released,
            runtime: movieDisplay.runtime,
            watched: watched,
            description: movieDisplay.description,
            rating: rating,
            poster: movieDisplay.poster,
            genre: [...genre]
        };
        const updatedUserList = userMovies.map((movie) => {
            if (movie.title === movieDisplay.title) {
                return editedMovie;
            }
            return movie;
        });
        setUserMovies(updatedUserList);
    }

    function updateUserMovies(newMovie: Movie) {
        const movieExists = userMovies.some(
            (movie) => movie.title === newMovie.title
        );

        let updatedUserMovies: Movie[];

        if (!movieExists) {
            updatedUserMovies = [...userMovies, newMovie];
        } else {
            updatedUserMovies = userMovies.map((movie) => {
                if (movie.title === newMovie.title) {
                    return { ...movie, title: movie.title + " " };
                }
                return movie;
            });
        }

        setUserMovies(updatedUserMovies);

        const updatedUserListPairs = userListPairs.map((pair) => {
            if (pair.username === user.name) {
                return { ...pair, userList: updatedUserMovies };
            }
            return pair;
        });

        setUserListPairs(updatedUserListPairs);
    }

    //SORTING FUNCTIONS
    function sortRuntimeA() {
        const newMovies = [...userMovies].sort((m1, m2) =>
            m1.runtime < m2.runtime ? -1 : 1
        );
        setUserMovies(newMovies);
    }

    function sortRuntimeD() {
        const newMovies = [...userMovies].sort((m1, m2) =>
            m1.runtime > m2.runtime ? -1 : 1
        );
        setUserMovies(newMovies);
    }

    function sortAlphabeticalTitleA() {
        const newMovies = [...userMovies].sort((m1, m2) =>
            m1.title < m2.title ? -1 : 1
        );
        setUserMovies(newMovies);
    }

    function sortAlphabeticalTitleR() {
        const newMovies = [...userMovies].sort((m1, m2) =>
            m1.title > m2.title ? -1 : 1
        );
        setUserMovies(newMovies);
    }

    function sortReleaseDateA() {
        const newMovies = [...userMovies].sort((m1, m2) =>
            m1.released < m2.released ? -1 : 1
        );
        setUserMovies(newMovies);
    }

    function sortReleaseDateD() {
        const newMovies = [...userMovies].sort((m1, m2) =>
            m1.released > m2.released ? -1 : 1
        );
        setUserMovies(newMovies);
    }

    function sortRatingA() {
        const newMovies = [...userMovies].sort((m1, m2) =>
            m1.rating < m2.rating ? -1 : 1
        );
        setUserMovies(newMovies);
    }

    function sortRatingD() {
        const newMovies = [...userMovies].sort((m1, m2) =>
            m1.rating > m2.rating ? -1 : 1
        );
        setUserMovies(newMovies);
    }

    //DROP FUNCTION
    const [{ isOver }, drop] = useDrop({
        accept: MovieTypes.MOVIE,
        drop: (item: Movie) => updateUserMovies(item),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div>
            {user.role === "user" ? (
                <>
                    <div>
                        <h2
                            style={{
                                textAlign: "left",
                                marginLeft: "50px",
                                marginTop: "50px",
                                color: "gainsboro"
                            }}
                        >
                            {user.name}
                        </h2>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: "10px",
                                marginRight: "10px"
                            }}
                        >
                            <button
                                onClick={sortRuntimeA}
                                className="sortButton"
                            >
                                Sort by Runtime: Low-High
                            </button>
                            <button
                                onClick={sortRuntimeD}
                                className="sortButton"
                            >
                                Sort by Runtime: High-Low
                            </button>
                            <button
                                onClick={sortAlphabeticalTitleA}
                                className="sortButton"
                            >
                                Sort by Title: A-Z
                            </button>
                            <button
                                onClick={sortAlphabeticalTitleR}
                                className="sortButton"
                            >
                                Sort by Title: Z-A
                            </button>
                            <button
                                onClick={sortReleaseDateA}
                                className="sortButton"
                            >
                                Sort by Release Date: Old-New
                            </button>
                            <button
                                onClick={sortReleaseDateD}
                                className="sortButton"
                            >
                                Sort by Release Date: New-Old
                            </button>
                            <button
                                onClick={sortRatingA}
                                className="sortButton"
                            >
                                Sort by Rating: Low-High
                            </button>
                            <button
                                onClick={sortRatingD}
                                className="sortButton"
                            >
                                Sort by Rating: High-Low
                            </button>
                            <button
                                style={{ backgroundColor: "#f44336" }}
                                onClick={() => setUserMovies([])}
                                className="sortButton"
                            >
                                CLEAR LIST
                            </button>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div
                            ref={drop}
                            style={{
                                backgroundColor: isOver ? "lime" : "lightpink",
                                width: "1300px",
                                height: "200px",
                                border: "2px dashed black",
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: "30px",
                                overflow: "auto",
                                padding: "30px",
                                marginTop: "10px"
                            }}
                            data-testID="movieDrop"
                        >
                            {userMovies.map((movie) => {
                                return (
                                    <div
                                        role="userMovie"
                                        className="ListItem"
                                        key={movie.title}
                                        style={{ marginRight: "30px" }}
                                        onClick={() =>
                                            updateMovieDisplay(movie)
                                        }
                                    >
                                        <ShowMovieDetails
                                            movie={movie}
                                        ></ShowMovieDetails>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            style={{
                                marginLeft: "25px",
                                backgroundColor: "tomato",
                                height: "325px",
                                border: "3px dotted cyan",
                                width: "530px",
                                padding: "15px",
                                marginTop: "10px",
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
                                    <p data-testID="displayTitle">
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
                                Genres:{" "}
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
                            <h4>Edit Here:</h4>
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
                                type="number"
                                value={rating}
                                onChange={(e) =>
                                    setRating(parseInt(e.target.value))
                                }
                                placeholder="Change Rating"
                                style={{ marginBottom: "5px" }}
                            />
                            <div></div>
                            <input
                                type="text"
                                value={genreInput}
                                onChange={updateGenreInput}
                                placeholder="Enter Genre to Add"
                                style={{ marginBottom: "5px" }}
                            />
                            <button onClick={addGenre}>Add Genre</button>
                            <div></div>
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
                                Save Changes
                            </button>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
