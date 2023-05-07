import React from "react";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { MovieTypes } from "../interfaces/MovieTypes";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
// import testMovies from "../data/movies.json";
import { ShowMovieDetails } from "./moviePoster";
// import { User } from "../interfaces/user";
import { userMovies } from "../App";
import { EditMode } from "./EditUserMode";
import { UserListPair } from "../interfaces/UserListPair";

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
        poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
    });

    // function updateUserMovies(newMovie: Movie) {
    //     const movieExists = userMovies.some(
    //         (movie) => movie.title === newMovie.title
    //     );
    //     if (!movieExists) {
    //         setUserMovies([...userMovies, newMovie]);
    //     } else {
    //         newMovie.title = newMovie.title + " ";
    //         setUserMovies([...userMovies, newMovie]);
    //     }

    //     const updateIdx = userListPairs.findIndex(
    //         (userListPair) => user.name === userListPair.username
    //     );
    //     const newPair: UserListPair = {
    //         username: user.name,
    //         userList: userMovies
    //     };

    //     const updatedPairs = [
    //         ...userListPairs.slice(0, updateIdx),
    //         newPair,
    //         ...userListPairs.slice(updateIdx + 1)
    //     ];
    //     setUserListPairs(updatedPairs);
    // }

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
                    return { ...movie, watched: !movie.watched };
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
                        <h2>User</h2>
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
                                height: "175px",
                                border: "2px dashed black",
                                display: "flex",
                                flexDirection: "row",
                                marginLeft: "30px",
                                overflow: "auto",
                                padding: "5px",
                                marginTop: "10px"
                            }}
                        >
                            {userMovies.map((movie) => {
                                return (
                                    <div
                                        className="ListItem"
                                        key={movie.title}
                                        style={{ marginRight: "10px" }}
                                        onClick={() => setMovieDisplay(movie)}
                                    >
                                        <ShowMovieDetails
                                            movie={movie}
                                        ></ShowMovieDetails>
                                        <EditMode movie={movie}></EditMode>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            style={{
                                marginLeft: "25px",
                                backgroundColor: "darkolivegreen",
                                height: "325px",
                                border: "3px dotted cyan",
                                width: "530px",
                                padding: "15px",
                                marginTop: "10px"
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
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
}
