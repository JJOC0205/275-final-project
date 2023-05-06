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
import testmovies from "./data/movies.json";
import { SuperAddUser } from "./components/SuperAddUser";

export interface superMovies {
    superMovies: Movie[];
    setSuperMovies: (movies: Movie[]) => void;
    user: User;
    setCilMovies: (movies: Movie[]) => void;
}

export interface userMovies {
    userMovies: Movie[];
    setUserMovies: (movies: Movie[]) => void;
    user: User;
}

export interface cilMovies {
    cilMovies: Movie[];
    setCilMovies: (movies: Movie[]) => void;
}

export interface superAddUser {
    users: User[];
    setUsers: (users: User[]) => void;
}

function App(): JSX.Element {
    const [superMovies, setSuperMovies] = useState<Movie[]>(testmovies);
    const [cilMovies, setCilMovies] = useState<Movie[]>(testmovies);
    const [userMovies, setUserMovies] = useState<Movie[]>([]);

    const [users, setUsers] = useState<User[]>(USERS);
    const [currUser, setUser] = useState<User>(users[0]);

    return (
        <div className="App">
            <header className="App-header" style={{ marginBottom: "25px" }}>
                <h3>MOVIE MASH</h3>
            </header>
            <DndProvider backend={HTML5Backend}>
                <CentralItemList
                    cilMovies={cilMovies}
                    setCilMovies={setCilMovies}
                ></CentralItemList>
                <hr></hr>
                <UserSelect users={users} setUser={setUser}></UserSelect>
                {currUser.role === "super" && (
                    <SuperAddUser users={users} setUsers={setUsers} />
                )}
                <hr></hr>
                <UserList
                    userMovies={userMovies}
                    setUserMovies={setUserMovies}
                    user={currUser}
                ></UserList>
                <hr></hr>
                <SuperList
                    superMovies={superMovies}
                    setSuperMovies={setSuperMovies}
                    user={currUser}
                    setCilMovies={setCilMovies}
                ></SuperList>
            </DndProvider>
        </div>
    );
}
export default App;
