import React, { useState } from "react";
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
                <h3>Movie World</h3>
                Jon OConell, Rachel Robins, Ani Naredla, Shreya Pamulapati
            </header>
            <DndProvider backend={HTML5Backend}>
                <button onClick={updateCIL}>Click to Update CIL</button>
                <CentralItemList
                    cilMovies={cilMovies}
                    setCilMovies={setCilMovies}
                ></CentralItemList>
                <hr></hr>
                <button onClick={() => setUserListVisible(!userListVisible)}>
                    {userListVisible ? "Hide User List" : "Show User List"}
                </button>
                {userListVisible && (
                    <UserList
                        userMovies={userMovies}
                        setUserMovies={setUserMovies}
                    />
                )}
                <hr></hr>
                <button onClick={() => setSuperListVisible(!superListVisible)}>
                    {superListVisible ? "Hide Super List" : "Show Super List"}
                </button>
                {superListVisible && (
                    <SuperList
                        superMovies={superMovies}
                        setSuperMovies={setSuperMovies}
                    />
                )}
            </DndProvider>
        </div>
    );
}
export default App;
