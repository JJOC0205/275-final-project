import React from "react";
import {useDrop} from "react-dnd" 
import { useState } from "react";
import { MovieProps } from "./Movie";
import { ItemTypes } from "./ItemTypes";
import Movie from "./Movie";
import './UserList.css';

export const userMoviesList = [];

interface UserListExport {
    userMovies: MovieProps[];
}

export function UserList(): JSX.Element {

    const [userMovies, setUserMovies] = useState<MovieProps[]>(userMoviesList);
    function updateUserMovies(movie: MovieProps) {
        setUserMovies([...userMovies, movie])
        console.log(userMovies.length);
        userMovies.map((movie) => console.log(movie.title));
    }

    const [{isOver}, drop] = useDrop(() => ({
        accept: ItemTypes.MOVIE,
        drop: (item: MovieProps) => updateUserMovies(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        }),
    }),)


    return (
        <div ref={drop} style={{ backgroundColor: isOver ? 'red' : 'white', width: "510px", height:"1000px", border: "1px solid#000", overflow: "auto" }}>
            {userMovies.map((movie) => {
                return <div className="ListItem">
                    <Movie title={movie.title} released={movie.released} runtime={movie.released} watched={movie.watched} description={movie.description} rating={movie.rating}></Movie>
                </div>
            })}
        </div>
    )
}

export const userListExport: UserListExport = {
    userMovies: []
};

export default UserList;