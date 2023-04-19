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
            <header className="App-header">Movie World</header>
            <h3>Jon OConell, Rachel Robins, Ani Naredla, Shreya Pamulapati</h3>

            <CentralItemList movies={movies}></CentralItemList>
        </div>
    );
}
export default App;
