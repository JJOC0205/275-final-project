import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/MOVIE MASH/i);
    expect(linkElement).toBeInTheDocument();
});
