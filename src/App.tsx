import React, { useState } from "react";
import { MOVIES } from "./data/MovieList";
import { CentralItemList } from "./components/CentralItemList";
import { Movie } from "./interfaces/movie";
import "./App.css";

function App(): JSX.Element {
    const [movies] = useState<Movie[]>(MOVIES);
    return (
        <div className="App">
            <header className="App-header">
                <h3>Movie World</h3>
                Jon OConell, Rachel Robins, Ani Naredla, Shreya Pamulapati
            </header>
            <CentralItemList movies={movies}></CentralItemList>
        </div>
    );
}
export default App;
