import React from "react";
// import { useState } from "react";
import { CentralItemList } from "./components/CentralItemList";
import "./App.css";
import { UserList } from "./components/UserList";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";
import { SuperList } from "./components/SuperList";

function App(): JSX.Element {
    // const [showUser, setShowUser] = useState<boolean>(false);
    return (
        <div className="App">
            <header className="App-header">
                <h3>Movie World</h3>
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
