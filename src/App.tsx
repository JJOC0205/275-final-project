import React, { useState } from "react";
import { MOVIES } from "./data/MovieList";
import { CentralItemList } from "./components/CentralItemList";
import { Movie } from "./interfaces/movie";
import "./App.css";
import UserList from "./components/UserList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";

function App(): JSX.Element {
    const [movies] = useState<Movie[]>(MOVIES);
    return (
        <div className="App">
            <header className="App-header">
                <h3>MOVIE MASH</h3>
                Jon OConell, Rachel Robins, Ani Naredla, Shreya Pamulapati
            </header>
            <DndProvider backend={HTML5Backend}>
                <CentralItemList movies={movies}></CentralItemList>
                <UserList></UserList>
            </DndProvider>
        </div>
    );
}
export default App;
