import React from "react";
import { useState } from "react";
// import { MovieTypes } from "../interfaces/MovieTypes";
import "./UserList.css";
import { Movie } from "../interfaces/movie";
import testMovies from "../data/movies.json";
import { ShowMovieDetails } from "./moviePoster";
import { Stack } from "react-bootstrap";
import { MovieTypes } from "../interfaces/MovieTypes";
import { useDrop } from "react-dnd";

interface AdminListExport {
    adminMovies: Movie[];
}
export function AdminList(): JSX.Element {
    const [adminMovies, setAdminMovies] = useState<Movie[]>([]);

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
    return (
        <div>
            <Stack
                ref={drop}
                style={{
                    backgroundColor: isOver ? "lime" : "lightpink",
                    width: "1400px",
                    height: "130px",
                    border: "2px dashed black",
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "10px",
                    overflow: "auto",
                    padding: "10px"
                }}
            >
                {adminMovies.map((movie) => {
                    return (
                        <div
                            className="ListItem"
                            key={movie.title}
                            style={{ marginRight: "10px" }}
                        >
                            <ShowMovieDetails movie={movie}></ShowMovieDetails>
                        </div>
                    );
                })}
            </Stack>
        </div>
    );
}

export const userListExport: AdminListExport = {
    adminMovies: []
};
