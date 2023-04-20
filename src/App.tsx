import React, { useState } from "react";
import "./App.css";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd/dist/core";
import Movie from "./components/Movie";
import { testMovies } from "./components/UserList";
import UserList from "./components/UserList";
function App() {
    const [userMode, setUserMode] = useState<boolean>(false);
    return (
        <>
            <div className="App" style={{ display: "flex" }}>
                <DndProvider backend={HTML5Backend}>
                    <button onClick={() => setUserMode(!userMode)}>
                        Activate User List
                    </button>
                    <div style={{ flex: "1" }}>
                        {testMovies.map((movie) => (
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                released={movie.released}
                                runtime={movie.runtime}
                                watched={movie.watched}
                                description={movie.description}
                                rating={movie.rating}
                            ></Movie>
                        ))}
                    </div>
                    <div style={{ flex: "1" }}>
                        {/* <UserList></UserList> */}
                        {userMode && <UserList></UserList>}
                    </div>
                </DndProvider>
            </div>
        </>
    );
}

export default App;
