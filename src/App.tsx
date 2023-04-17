import React, { useState } from "react";
import { Movie } from "./interfaces/movie";
import { ShowMovieDetails } from "./components/moviePoster";
const theMovie = {
    title: "Test Movie",
    released: 2005,
    runtime: 60,
    watched: true,
    description: "test",
    rating: 10
};
function App(): JSX.Element {
    const [movies] = useState<Movie>(theMovie);
    return (
        <div className="App">
            <header className="App-header">Test</header>
            <ShowMovieDetails movie={movies}></ShowMovieDetails>
        </div>
    );
}
export default App;
