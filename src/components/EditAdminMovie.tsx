import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Movie } from "../interfaces/movie";

export function AdminEdit({ movie }: { movie: Movie }): JSX.Element {
    const [mode, setMode] = useState<boolean>(false);
    const [userRating, setRating] = useState<string>("");
    function ChangeMovieDetails(event: React.ChangeEvent<HTMLInputElement>) {
        setRating(event.target.value);
        movie.rating = parseInt(event.target.value);
    }
    function changeMode(event: React.ChangeEvent<HTMLInputElement>) {
        setMode(event.target.checked);
    }
    return (
        <div>
            {/* <h3>Rating</h3> */}
            <Form.Check
                type="switch"
                id="Change Movie Details"
                checked={mode}
                onChange={changeMode}
            />
            <div>
                <Form.Group controlId="name">
                    <Form.Control
                        type="text"
                        placeholder="Enter Movie Details"
                    />
                    <Form.Text className="text-muted">
                        Please enter your new movie details.
                    </Form.Text>
                </Form.Group>
            </div>
        </div>
    );
}
