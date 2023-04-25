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

    const [{ isOver }, drop] = useDrop({
        accept: MovieTypes.MOVIE,
        drop: (item: Movie) => updateUserMovies(item),
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    return (
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
    );
}

export const userListExport: UserListExport = {
    userMovies: []
};

export default UserList;
