import { DragSourceMonitor, useDrag } from "react-dnd";
import { Movie } from "../interfaces/movie";
import React, { useState } from "react";
import { MovieTypes } from "../interfaces/MovieTypes";

export function ShowMovieDetails({ movie }: { movie: Movie }): JSX.Element {
    const [, drag] = useDrag({
        type: MovieTypes.MOVIE,
        item: {
            title: movie.title,
            released: movie.released,
            runtime: movie.runtime,
            watched: movie.watched,
            description: movie.description,
            rating: movie.rating
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div ref={drag}>
            <img
                src={movie.poster}
                height="100px"
                width="100px"
                onClick={() => setVisible(!visible)}
            />
            {/* {visible && <div>{movie.rating}</div>} */}
        </div>
    );
}
