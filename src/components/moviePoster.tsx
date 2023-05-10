import { DragSourceMonitor, useDrag } from "react-dnd";
import { Movie } from "../interfaces/movie";
import React from "react";
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
            rating: movie.rating,
            poster: movie.poster,
            genre: movie.genre
        },
        collect: (monitor: DragSourceMonitor) => ({
            isDragging: !!monitor.isDragging()
        })
    });
    // const [visible, setVisible] = useState<boolean>(false);
    return (
        <div ref={drag} role="moviePosterImage">
            <img
                src={movie.poster}
                alt={movie.title}
                height="125px"
                width="125px"
            />
        </div>
    );
}
