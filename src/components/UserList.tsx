import React from "react";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { MovieTypes } from "../interfaces/MovieTypes";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
import testMovies from "../data/movies.json";
import { ShowMovieDetails } from "./moviePoster";

interface UserListExport {
    userMovies: Movie[];
}

export function UserList(): JSX.Element {
    const [userMovies, setUserMovies] = useState<Movie[]>([]);
    function updateUserMovies(newMovie: Movie) {
        const movieFilter = testMovies.filter(
            (movie) => newMovie.title === movie.title
        );
        // setUserMovies([...userMovies, movieFilter[0]]);
        newMovie.poster = movieFilter[0].poster;
        setUserMovies([...userMovies, newMovie]);
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

    const [{ isOver }, drop] = useDrop({
        accept: MovieTypes.MOVIE,
        drop: (item: Movie) => updateUserMovies(item),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <button onClick={sortRuntimeA} className="sortButton">
                    Sort by Runtime: Low-High
                </button>
                <button onClick={sortRuntimeD} className="sortButton">
                    Sort by Runtime: High-Low
                </button>
                <button onClick={sortAlphabeticalTitleA} className="sortButton">
                    Sort by Title: A-Z
                </button>
                <button onClick={sortAlphabeticalTitleR} className="sortButton">
                    Sort by Title: Z-A
                </button>
                <button onClick={sortReleaseDateA} className="sortButton">
                    Sort by Release Date: Old-New
                </button>
                <button onClick={sortReleaseDateD} className="sortButton">
                    Sort by Release Date: New-Old
                </button>
            </div>
            <div
                ref={drop}
                style={{
                    backgroundColor: isOver ? "red" : "white",
                    width: "510px",
                    height: "1000px",
                    border: "1px solid#000"
                }}
            >
                {userMovies.map((movie) => {
                    return (
                        <div className="ListItem" key={movie.title}>
                            <ShowMovieDetails movie={movie}></ShowMovieDetails>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export const userListExport: UserListExport = {
    userMovies: []
};

export default UserList;
