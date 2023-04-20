import React from "react";
import { useDrop } from "react-dnd";
import { useState } from "react";
import { MovieProps } from "./Movie";
import { ItemTypes } from "./ItemTypes";
import Movie from "./Movie";
import "./UserList.css";

//export const userMoviesList:MovieProps[] = [];

export const testMovies: MovieProps[] = [
    {
        id: 0,
        title: "The Shawshank Redemption",
        released: 1994,
        runtime: 142,
        watched: true,
        description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        rating: 9.3
    },
    {
        id: 1,
        title: "The Godfather",
        released: 1972,
        runtime: 175,
        watched: true,
        description:
            "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
        rating: 9.2
    },
    {
        id: 2,
        title: "The Dark Knight",
        released: 2008,
        runtime: 152,
        watched: true,
        description:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        rating: 9.0
    },
    {
        id: 3,
        title: "12 Angry Men",
        released: 1957,
        runtime: 96,
        watched: false,
        description:
            "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
        rating: 8.9
    },
    {
        id: 4,
        title: "Schindler's List",
        released: 1993,
        runtime: 195,
        watched: false,
        description:
            "In German occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        rating: 8.9
    }
];

interface UserListExport {
    userMovies: MovieProps[];
}

export function UserList(): JSX.Element {
    const [userMovies, setUserMovies] = useState<MovieProps[]>([]);
    function updateUserMovies(newMovie: MovieProps) {
        const movieFilter = testMovies.filter(
            (movie) => newMovie.title === movie.title
        );
        setUserMovies([...userMovies, movieFilter[0]]);
        console.log(userMovies.length);
        // userMovies.map((movie) => console.log(movie.title));
    }

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.MOVIE,
        drop: (item: MovieProps, monitor) => updateUserMovies(item),
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
                    <div className="ListItem" key={movie.id}>
                        <Movie
                            id={movie.id}
                            title={movie.title}
                            released={movie.released}
                            runtime={movie.runtime}
                            watched={movie.watched}
                            description={movie.description}
                            rating={movie.rating}
                        ></Movie>
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
