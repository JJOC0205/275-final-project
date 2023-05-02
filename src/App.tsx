import React, { useState } from "react";
import { MOVIES } from "./data/MovieList";
import users from "./data/users.json";
import { CentralItemList } from "./components/CentralItemList";
import { Movie } from "./interfaces/movie";
import { UserSelect } from "./components/UserSelect";
import { User } from "./interfaces/user";
import "./App.css";
import UserList from "./components/UserList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";

const USERS = users.map(
    (user): User => ({
        ...user
    })
);

function App(): JSX.Element {
    const [movies] = useState<Movie[]>(MOVIES);
    const [users, setUsers] = useState<User[]>(USERS);
    const [currUser, setUser] = useState<User>(users[0]);

    function setCurrentUser(id: number) {
        users.map((user: User): User | void =>
            id === currUser.id ? setUser(user) : user
        );
    }

    function addUser(newUser: User) {
        const existing = users.find(
            (user: User): boolean => user.id === newUser.id
        );
        if (existing === undefined) {
            setUsers([...users, newUser]);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h3>Holly, Bolly, and Tolly</h3>
                Jon OConell, Rachel Robins, Ani Naredla, Shreya Pamulapati
            </header>
            <DndProvider backend={HTML5Backend}>
                <CentralItemList
                    movies={movies}
                    user={currUser}
                ></CentralItemList>
                <UserList></UserList>
            </DndProvider>
            <UserSelect
                users={users}
                user={currUser}
                setCurrentUser={setCurrentUser}
            ></UserSelect>
        </div>
    );
}
export default App;
