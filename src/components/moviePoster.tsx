import { Movie } from "../interfaces/movie";
import React, { useState } from "react";
//import { Button } from "react-bootstrap";

export function ShowMovieDetails({ movie }: { movie: Movie }): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div>
            <img
                src="https://m.media-amazon.com/images/I/81Uk9cyj1-L.jpg"
                height="100px"
                width="100px"
                onClick={() => setVisible(!visible)}
            />
            {visible && <div>{movie.title}</div>}
        </div>
    );
}
