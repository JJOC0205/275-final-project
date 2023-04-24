import { Movie } from "../interfaces/movie";
import movies from "./movies.json";

export const MOVIES = movies.map(
    (movie): Movie => ({
        ...movie
    })
);
