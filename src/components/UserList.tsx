import React from "react";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { MovieTypes } from "../interfaces/MovieTypes";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
import { ShowMovieDetails } from "./moviePoster";
import { userMovies } from "../App";

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

export function UserList({
    userMovies,
    setUserMovies,
    user,
    setUserListPairs,
    userListPairs
}: userMovies): JSX.Element {
    const [movieDisplay, setMovieDisplay] = useState<Movie>(defaultMovie);

    function updateMovieDisplay(movie: Movie) {
        setMovieDisplay(movie);
        setWatched(movie.watched);
        setRating(movie.rating);
        setGenre(movie.genre);
    }

    function removeMovie(movie: Movie) {
        const userCopy = [...userMovies];
        const updatedMovies = userCopy.filter((m) => m.title !== movie.title);
        setUserMovies(updatedMovies);
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
        if (genre.length > 1) {
            const updatedGenre = genre.filter((item) => item !== genreToRemove);
            setGenre(updatedGenre);
            setGenreInput("");
        }
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
        updateMovieDisplay(editedMovie);
    }

    function updateUserMovies(newMovie: Movie) {
        const updatedUserMovies = [...userMovies, newMovie];

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
                            {user.name}: Create your own movie list.
                        </h2>
                        <h2
                            style={{ color: "lightcyan", marginBottom: "20px" }}
                        >
                            Drag movies, click any movie poster{" "}
                            <span style={{ color: "orange" }}>before</span>{" "}
                            viewing and editing the movie on the right.
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
                                style={{ height: "50px" }}
                            >
                                Sort by Runtime: Low-High
                            </button>
                            <button
                                onClick={sortRuntimeD}
                                className="sortButton"
                                style={{ height: "50px" }}
                            >
                                Sort by Runtime: High-Low
                            </button>
                            <button
                                onClick={sortAlphabeticalTitleA}
                                className="sortButton"
                                style={{ height: "50px" }}
                            >
                                Sort by Title: A-Z
                            </button>
                            <button
                                onClick={sortAlphabeticalTitleR}
                                className="sortButton"
                                style={{ height: "50px" }}
                            >
                                Sort by Title: Z-A
                            </button>
                            <button
                                onClick={sortReleaseDateA}
                                className="sortButton"
                                style={{ height: "50px" }}
                            >
                                Sort: Oldest to Newest
                            </button>
                            <button
                                onClick={sortReleaseDateD}
                                className="sortButton"
                                style={{ height: "50px" }}
                            >
                                Sort: Newest to Oldest
                            </button>
                            <button
                                onClick={sortRatingA}
                                className="sortButton"
                                style={{ height: "50px" }}
                            >
                                Sort by Rating: Low-High
                            </button>
                            <button
                                onClick={sortRatingD}
                                className="sortButton"
                                style={{ height: "50px" }}
                            >
                                Sort by Rating: High-Low
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#f44336",
                                    height: "50px"
                                }}
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
                                height: "250px",
                                border: "2px dashed black",
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: "30px",
                                overflow: "auto",
                                padding: "30px",
                                marginTop: "75px"
                            }}
                            data-testid="movieDrop"
                        >
                            {userMovies.map((movie, index) => {
                                return (
                                    <div
                                        role="userMovie"
                                        className="ListItem"
                                        // key={movie.title}
                                        key={index}
                                        style={{ marginRight: "30px" }}
                                        onClick={() =>
                                            updateMovieDisplay(movie)
                                        }
                                    >
                                        <ShowMovieDetails
                                            movie={movie}
                                        ></ShowMovieDetails>
                                        <button
                                            role="removeMovieButton"
                                            style={{
                                                height: "30px",
                                                width: "75px",
                                                backgroundColor: "lemonchiffon",
                                                marginTop: "10px",
                                                marginLeft: "25px"
                                            }}
                                            onClick={() => removeMovie(movie)}
                                        >
                                            Remove
                                        </button>
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
                                    marginBottom: "5px"
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
