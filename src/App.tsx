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

function App(): JSX.Element {
    // const [showUser, setShowUser] = useState<boolean>(false);
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
                <UserList user={currUser}></UserList>
                <hr></hr>
                <SuperList user={currUser}></SuperList>
                <UserSelect users={users} setUser={setUser}></UserSelect>
            </DndProvider>
        </div>
    );
}
export default App;
