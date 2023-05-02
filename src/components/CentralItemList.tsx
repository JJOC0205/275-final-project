import React from "react";
import { useState } from "react";
import { Movie } from "../interfaces/movie";
import { Stack } from "react-bootstrap";
import { ShowMovieDetails } from "./moviePoster";
import { EditMode } from "./EditUserMode";
// import testMovies from "../data/movies.json";
import "./UserList.css";
import { superMovies } from "./SuperList";

export function CentralItemList(): JSX.Element {
    const [allMovies, setAllMovies] = useState<Movie[]>(superMovies);
    const [runtimeRange, setRuntimeRange] = useState<number[]>([0, Infinity]);
    const [, setRatingLevel] = useState<number>(0);
    const [movieDisplay, setMovieDisplay] = useState<Movie>(superMovies[6]);

    const handleRuntimeFilter = (min: number, max: number) => {
        setRuntimeRange([min, max]);
        setAllMovies(
            superMovies.filter(
                (movie) => movie.runtime >= min && movie.runtime <= max
            )
        );
    };

    const handleResetFilter = () => {
        setRuntimeRange([0, Infinity]);
        setAllMovies(superMovies);
    };

    const handleDescriptionFilter = (keyword: string) => {
        setAllMovies(
            superMovies.filter(
                (movie) =>
                    movie.runtime >= runtimeRange[0] &&
                    movie.runtime <= runtimeRange[1] &&
                    movie.description
                        .toLowerCase()
                        .includes(keyword.toLowerCase())
            )
        );
    };

    const handleTitleFilter = (keyword: string) => {
        setAllMovies(
            superMovies.filter(
                (movie) =>
                    movie.runtime >= runtimeRange[0] &&
                    movie.runtime <= runtimeRange[1] &&
                    movie.title.toLowerCase().includes(keyword.toLowerCase())
            )
        );
    };

    const handleRatingFilter = (level: number) => {
        setRatingLevel(level);
        setAllMovies(
            superMovies.filter(
                (movie) =>
                    movie.runtime >= runtimeRange[0] &&
                    movie.runtime <= runtimeRange[1] &&
                    movie.rating >= level
            )
        );
    };

    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div
                    style={{
                        justifyItems: "center",
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "10px",
                        marginTop: "10px",
                        alignItems: "center",
                        width: "500px",
                        height: "100px",
                        marginLeft: "50px"
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search by Description"
                        onChange={(e) =>
                            handleDescriptionFilter(e.target.value)
                        }
                        className="filterForm"
                        style={{ marginBottom: "20px", marginTop: "10px" }}
                    />
                    <input
                        type="text"
                        placeholder="Search by Title"
                        onChange={(e) => handleTitleFilter(e.target.value)}
                        className="filterForm"
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "150px",
                        marginTop: "20px"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: "10px",
                            width: "800px"
                        }}
                    >
                        Filter by Runtime:
                        <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => handleRuntimeFilter(60, 120)}
                            className="filterButton"
                        >
                            Medium: 1-2 hours
                        </button>
                        <button
                            onClick={() => handleRuntimeFilter(120, Infinity)}
                            className="filterButton"
                        >
                            Long: exceeds 2 hours
                        </button>
                        <button
                            onClick={handleResetFilter}
                            className="filterButton"
                            style={{ backgroundColor: "#f44336" }}
                        >
                            RESET
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginBottom: "10px",
                            justifyContent: "center",
                            width: "1100px"
                        }}
                    >
                        Filter by Minimum Rating:
                        <button
                            style={{ marginLeft: "10px" }}
                            onClick={() => handleRatingFilter(2)}
                            className="filterButton2"
                        >
                            2 and above
                        </button>
                        <button
                            onClick={() => handleRatingFilter(4)}
                            className="filterButton2"
                        >
                            4 and above
                        </button>
                        <button
                            onClick={() => handleRatingFilter(6)}
                            className="filterButton2"
                        >
                            6 and above
                        </button>
                        <button
                            onClick={() => handleRatingFilter(8)}
                            className="filterButton2"
                        >
                            8 and above
                        </button>
                        <button
                            onClick={() => handleRatingFilter(10)}
                            className="filterButton2"
                        >
                            Highest: 10
                        </button>
                        <button
                            onClick={handleResetFilter}
                            className="filterButton2"
                            style={{
                                backgroundColor: "#f44336",
                                fontFamily: "serif"
                            }}
                        >
                            RESET
                        </button>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Stack
                    direction="horizontal"
                    gap={3}
                    style={{
                        marginLeft: "30px",
                        backgroundColor: "lightseagreen",
                        padding: "10px",
                        overflow: "auto",
                        width: "1300px"
                    }}
                >
                    {allMovies.map((movie: Movie) => (
                        <div
                            key={movie.title}
                            onClick={() => setMovieDisplay(movie)}
                        >
                            <ShowMovieDetails movie={movie}></ShowMovieDetails>
                            <EditMode movie={movie}></EditMode>
                        </div>
                    ))}
                </Stack>
                <div
                    style={{
                        marginLeft: "25px",
                        backgroundColor: "lightsteelblue",
                        height: "325px",
                        border: "3px dotted black",
                        width: "530px",
                        padding: "15px"
                    }}
                >
                    <p>Title: {movieDisplay.title}</p>
                    <p>Release Date: {movieDisplay.released}</p>
                    <p>Runtime in Minutes: {movieDisplay.runtime}</p>
                    <p>Watched: {movieDisplay.watched.toString()}</p>
                    <p>Description: {movieDisplay.description}</p>
                    <p>Rating out of 10: {movieDisplay.rating}</p>
                </div>
            </div>
        </>
    );
}
