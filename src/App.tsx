import React from "react";
import { useState } from "react";
import { CentralItemList } from "./components/CentralItemList";
import "./App.css";
import { UserList } from "./components/UserList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";
import { SuperList } from "./components/SuperList";
import { UserSelect } from "./components/UserSelect";
import { USERS } from "./data/UsersList";
import { User } from "./interfaces/user";
import { Movie } from "./interfaces/movie";

export interface superMovies {
    superMovies: Movie[];
    setSuperMovies: (movies: Movie[]) => void;
    user: User;
}

export interface userMovies {
    userMovies: Movie[];
    setUserMovies: (movies: Movie[]) => void;
    user: User;
}

export interface cilMovies {
    cilMovies: Movie[];
    setCilMovies: (movies: Movie[]) => void;
    user: User;
}

function App(): JSX.Element {
    // const [showUser, setShowUser] = useState<boolean>(false);
    // const [superMovies, setSuperMovies] = useState<Movie[]>(testmovies);
    // const [cilMovies, setCilMovies] = useState<Movie[]>(testmovies);
    // const [userMovies, setUserMovies] = useState<Movie[]>([]);

    const [users] = useState<User[]>(USERS);
    const [currUser, setUser] = useState<User>(users[0]);
    return (
        <div className="App">
            <header className="App-header">
                <h3>MOVIE MASH</h3>
            </header>
            <DndProvider backend={HTML5Backend}>
                <CentralItemList></CentralItemList>
                <hr></hr>
                <UserSelect users={users} setUser={setUser}></UserSelect>
                <hr></hr>
                <UserList user={currUser}></UserList>
                <hr></hr>
                <SuperList user={currUser}></SuperList>
            </DndProvider>
        </div>
    );
}
export default App;
