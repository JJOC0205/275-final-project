import React from 'react';
import './App.css';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd/dist/core';
import Movie from './Movie';
import UserList from './UserList';
import { testMovies } from './Movie';

function App() {
  return (
    <>
    <div className="App" style={{display: "flex"}}>
      <DndProvider backend={HTML5Backend}>
        <div style={{flex: "1"}}>
          {testMovies.map((movie) => (<Movie title={movie.title} released={movie.released} runtime={movie.runtime} watched={movie.watched} description={movie.description} rating={movie.rating}></Movie>))}
        </div>
        <div style={{flex: "1"}}>
          {/* <div> */}
          <UserList></UserList>
          {/* </div> */}
        </div>
      </DndProvider>
    </div>
    </>
  );
}

export default App;
