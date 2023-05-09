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
import { UserListPair } from "./interfaces/UserListPair";
import { allUsers } from "./interfaces/UserListPair";
import { AdminList } from "./components/AdminList";

export interface superMovies {
    superMovies: Movie[];
    setSuperMovies: (movies: Movie[]) => void;
    user: User;
    setCilMovies: (movies: Movie[]) => void;
}

export interface cilMovies {
    cilMovies: Movie[];
    setCilMovies: (movies: Movie[]) => void;
}

export interface superAddUser {
    users: User[];
    setUsers: (users: User[]) => void;
}

export interface userMovies {
    userMovies: Movie[];
    setUserMovies: (movies: Movie[]) => void;
    user: User;
    setUserListPairs: (userListPairs: UserListPair[]) => void;
    userListPairs: UserListPair[];
}

export interface userSelect {
    users: User[];
    setUsers: (users: User[]) => void;
    userMovies: Movie[];
    setUserMovies: (userMovies: Movie[]) => void;
    userListPairs: UserListPair[];
    setUser: (user: User) => void;
    currUser: User;
}
export interface adminMovies {
    adminMovies: Movie[];
    setAdminMovies: (movies: Movie[]) => void;
    setCilMovies: (movies: Movie[]) => void;
    user: User;
    cilMovies: Movie[];
    setSuperMovies: (movies: Movie[]) => void;
}

function App(): JSX.Element {
    const [superMovies, setSuperMovies] = useState<Movie[]>(testmovies);
    const [adminMovies, setAdminMovies] = useState<Movie[]>([]);
    const [cilMovies, setCilMovies] = useState<Movie[]>(testmovies);
    const [userMovies, setUserMovies] = useState<Movie[]>([]);

    const [userListPairs, setUserListPairs] =
        useState<UserListPair[]>(allUsers);

    const [users, setUsers] = useState<User[]>(USERS);
    const [currUser, setUser] = useState<User>(users[0]);

    return (
        <div className="App">
            <header className="App-header">
                <h3>MOVIE MASH</h3>
            </header>
            <DndProvider backend={HTML5Backend}>
                <div
                    style={{
                        backgroundColor: "lightblue",
                        marginBottom: "50px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginBottom: "25px",
                            marginRight: "50px"
                        }}
                    >
                        <UserSelect
                            users={users}
                            setUser={setUser}
                            setUsers={setUsers}
                            userMovies={userMovies}
                            setUserMovies={setUserMovies}
                            userListPairs={userListPairs}
                            currUser={currUser}
                        ></UserSelect>
                    </div>

                    {currUser.role === "super" && (
                        <SuperAddUser users={users} setUsers={setUsers} />
                    )}
                </div>
                <h2 style={{ marginBottom: "25px" }}>
                    Click on a Movie to have its details displayed on the right.
                </h2>
                <CentralItemList
                    cilMovies={cilMovies}
                    setCilMovies={setCilMovies}
                ></CentralItemList>
                {userListPairs.map((userListPair: UserListPair) =>
                    currUser.name === userListPair.username ? (
                        <UserList
                            userMovies={userMovies}
                            setUserMovies={setUserMovies}
                            user={currUser}
                            userListPairs={userListPairs}
                            setUserListPairs={setUserListPairs}
                        />
                    ) : null
                )}
                <hr></hr>
                {currUser.role === "super" && (
                    <SuperList
                        superMovies={superMovies}
                        setSuperMovies={setSuperMovies}
                        setCilMovies={setCilMovies}
                        user={currUser}
                    />
                )}
                <hr></hr>
                {currUser.role === "admin" && (
                    <AdminList
                        adminMovies={adminMovies}
                        setAdminMovies={setAdminMovies}
                        setCilMovies={setCilMovies}
                        user={currUser}
                        cilMovies={cilMovies}
                        setSuperMovies={setSuperMovies}
                    />
                )}
            </DndProvider>
        </div>
    );
}
export default App;
