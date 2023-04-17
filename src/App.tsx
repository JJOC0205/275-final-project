import React from "react";

function App(): JSX.Element {
    const [movies] = useState<Movie>(theMovie);
    return (
        <div className="App">
            <header className="App-header">Test</header>
            <h1>Jon O' Connell, Rachel Robins, Ani Naredla, Shreya Pamulapati</h1>
            <ShowMovieDetails movie={movies}></ShowMovieDetails>
        </div>
    );
}
export default App;
