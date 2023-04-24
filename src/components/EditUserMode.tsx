import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Movie } from "../interfaces/movie";

export function EditMode({ movie }: { movie: Movie }): JSX.Element {
    const [mode, setMode] = useState<boolean>(false);
    const [userRating, setRating] = useState<string>("");
    function changeRating(event: React.ChangeEvent<HTMLInputElement>) {
        setRating(event.target.value);
        movie.rating = parseInt(event.target.value);
    }
    function changeMode(event: React.ChangeEvent<HTMLInputElement>) {
        setMode(event.target.checked);
    }
    return (
        <div>
            <h3>Rating</h3>
            <Form.Check
                type="switch"
                id="change rating"
                checked={mode}
                onChange={changeMode}
            />
            <div>
                {mode ? (
                    <Form.Group controlId="name">
                        <Form.Control
                            value={userRating}
                            onChange={changeRating}
                            disabled={!mode}
                        />
                    </Form.Group>
                ) : null}
            </div>
        </div>
    );
}
