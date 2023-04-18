import { Movie } from "../interfaces/movie";
import React, { useState } from "react";
//import { Button } from "react-bootstrap";

export function ShowMovieDetails({ movie }: { movie: Movie }): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <div>
            <img
                src={movie.poster}
                height="100px"
                width="100px"
                onClick={() => setVisible(!visible)}
            />
            {visible && <div>{movie.rating}</div>}
        </div>
    );
}
