import React, { useState } from "react";
import { Form } from "react-bootstrap";

export interface NewMovie {
    title: string;
    released: number;
    runtime: number;
    watched: boolean;
    description: string;
    rating: number;
    poster: string;
}

export function createNewMovie(): JSX.Element {
    const [title, setTitle] = useState<string>("");
    const [released, setReleased] = useState<number>(0);
    const [runtime, setRuntime] = useState<number>(0);
    const [watched, setWatched] = useState<boolean>(false);
    const [description, setDescription] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [poster, setPoster] = useState<string>("");

    function updateTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }
    function updateReleased(event: React.ChangeEvent<HTMLInputElement>) {
        setReleased(parseInt(event.target.value));
    }
    function updateRuntime(event: React.ChangeEvent<HTMLInputElement>) {
        setRuntime(parseInt(event.target.value));
    }
    function updateWatched(event: React.ChangeEvent<HTMLInputElement>) {
        setWatched(event.target.checked);
    }
    function updateDescription(event: React.ChangeEvent<HTMLInputElement>) {
        setDescription(event.target.value);
    }
    function updateRating(event: React.ChangeEvent<HTMLInputElement>) {
        setRating(parseInt(event.target.value));
    }
    function updatePoster(event: React.ChangeEvent<HTMLInputElement>) {
        setPoster(event.target.value);
    }

    return (
        <div style={{ border: "2px dashed grey", padding: "10px" }}>
            <Form.Group>
                <Form.Label>Enter Title: </Form.Label>
                <Form.Control onChange={updateTitle} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Release Date: </Form.Label>
                <Form.Control onChange={updateReleased} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Runtime in Minutes: </Form.Label>
                <Form.Control onChange={updateRuntime} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Watch Status T/F: </Form.Label>
                <Form.Control onChange={updateWatched} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Description: </Form.Label>
                <Form.Control onChange={updateDescription} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Rating /10: </Form.Label>
                <Form.Control onChange={updateRating} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Enter Image URL: </Form.Label>
                <Form.Control onChange={updatePoster} />
            </Form.Group>
        </div>
    );
}
