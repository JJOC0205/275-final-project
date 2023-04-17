import React, { useState } from "react";
import { CentralItemList } from "./components/CentralItemList";
import { Movie } from "./interfaces/movie";

const MOVIES = [
    {
        title: "Pride and Prejudice",
        released: 2005,
        runtime: 60,
        watched: true,
        description: "test",
        rating: 10
    },
    {
        title: "Test Movie",
        released: 2005,
        runtime: 60,
        watched: true,
        description: "test",
        rating: 10
    },
    {
        title: "Star Wars: All of Them",
        released: 2005,
        runtime: 60,
        watched: true,
        description: "test",
        rating: 10
    },
    {
        title: "Boss Baby",
        released: 2005,
        runtime: 60,
        watched: true,
        description: "test",
        rating: 10
    }
];

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
