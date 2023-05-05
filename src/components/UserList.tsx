import React from "react";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { MovieTypes } from "../interfaces/MovieTypes";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
// import testMovies from "../data/movies.json";
import { ShowMovieDetails } from "./moviePoster";
import { User } from "../interfaces/user";

export function UserList({ user }: { user: User }): JSX.Element {
    const [userMovies, setUserMovies] = useState<Movie[]>([]);

    function updateUserMovies(newMovie: Movie) {
        const movieExists = userMovies.some(
            (movie) => movie.title === newMovie.title
        );
        if (!movieExists) {
            setUserMovies([...userMovies, newMovie]);
        }
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
                    <div
                        ref={drop}
                        style={{
                            backgroundColor: isOver ? "lime" : "lightpink",
                            width: "1400px",
                            height: "110px",
                            border: "2px dashed black",
                            display: "flex",
                            flexDirection: "row",
                            marginLeft: "10px",
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
                                >
                                    <ShowMovieDetails
                                        movie={movie}
                                    ></ShowMovieDetails>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : null}
        </div>
    );
}
