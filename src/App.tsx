import React, { useState } from "react";
import movies from "./data/movies.json";
import { CentralItemList } from "./components/CentralItemList";
import { Movie } from "./interfaces/movie";

const MOVIES = movies.map(
    (movie): Movie => ({
        ...movie
    })
);

function App(): JSX.Element {
    const [movies] = useState<Movie[]>(MOVIES);
    return (
        <div className="App">
            <header className="App-header">Test</header>
            <CentralItemList movies={movies}></CentralItemList>
        </div>
    );
}
export default App;
