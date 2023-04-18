import { DragSourceMonitor, useDrag } from "react-dnd";
import React from "react";
import { ItemTypes } from "./ItemTypes";

export const testMovies: MovieProps[] = [
    {
        title: "The Shawshank Redemption",
        released: 1994,
        runtime: 142,
        watched: true,
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        rating: 9.3,
    },
    {
        title: "The Godfather",
        released: 1972,
        runtime: 175,
        watched: true,
        description: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
        rating: 9.2,
      },
      {
        title: "The Dark Knight",
        released: 2008,
        runtime: 152,
        watched: true,
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        rating: 9.0,
      },
      {
        title: "12 Angry Men",
        released: 1957,
        runtime: 96,
        watched: false,
        description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
        rating: 8.9,
      },
      {
        title: "Schindler's List",
        released: 1993,
        runtime: 195,
        watched: false,
        description: "In German occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        rating: 8.9,
      },
];

export interface MovieProps {
    title: string;
    released: number;
    runtime: number;
    watched: boolean;
    description: string;
    rating: number;
}

function Movie({title, released, runtime, watched, description, rating}: MovieProps) {
    const [{isDragging}, drag] = useDrag({
        type: ItemTypes.MOVIE,
        item: {title: title, released: released, runtime: runtime, watched: watched, description: description, rating: rating},
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, backgroundColor: "aqua", width:"500px", height:"275px", border:"1px solid#000"}}>
            <p>Title: {title}</p>
            <p>Release Date: {released}</p>
            <p>Runtime in Minutes: {runtime}</p>
            <p>Watched: {watched.toString()}</p>
            <p>Description: {description}</p>
            <p>Rating out of 10: {rating}</p>
            <div ref={drag}/>
            {/* <div><button>CLICK ME</button></div> */}
        </div>
      )
}

export default Movie;