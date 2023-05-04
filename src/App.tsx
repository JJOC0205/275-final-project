import React from "react";
import { useState } from "react";
import { CentralItemList } from "./components/CentralItemList";
import "./App.css";
import { UserList } from "./components/UserList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";
import { SuperList } from "./components/SuperList";
import { Movie } from "./interfaces/movie";
import testmovies from "./data/movies.json";

export interface superMovies {
    superMovies: Movie[];
    setSuperMovies: (movies: Movie[]) => void;
}

export interface userMovies {
    userMovies: Movie[];
    setUserMovies: (movies: Movie[]) => void;
}

export interface cilMovies {
    cilMovies: Movie[];
    setCilMovies: (movies: Movie[]) => void;
}

function App(): JSX.Element {
    const [superMovies, setSuperMovies] = useState<Movie[]>(testmovies);
    const [cilMovies, setCilMovies] = useState<Movie[]>(testmovies);
    const [userMovies, setUserMovies] = useState<Movie[]>([]);

    const [userListVisible, setUserListVisible] = useState<boolean>(false);
    const [superListVisible, setSuperListVisible] = useState<boolean>(false);

    function updateCIL() {
        setCilMovies(superMovies);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3>MOVIE MASH</h3>
                Jon OConell, Rachel Robins, Ani Naredla, Shreya Pamulapati
            </header>
            <DndProvider backend={HTML5Backend}>
                <CentralItemList></CentralItemList>
                <hr></hr>
                <UserList></UserList>
                <hr></hr>
                <SuperList></SuperList>
            </DndProvider>
        </div>
    );
}
export default App;
