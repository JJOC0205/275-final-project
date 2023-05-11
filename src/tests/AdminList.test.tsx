import React from "react";
import { render, screen } from "@testing-library/react";
import { User } from "../interfaces/user";
import { AdminList } from "../components/AdminList";
const testAdmin: User = {
    id: 1,
    name: "admin",
    role: "admin"
};
describe("AdminList Tests", () => {
    test("AdminList heading is present with the form", () => {
        render(
            <AdminList
                adminMovies={[]}
                setAdminMovies={function (): void {
                    throw new Error("Function not implemented.");
                }}
                setCilMovies={function (): void {
                    throw new Error("Function not implemented.");
                }}
                user={testAdmin}
                cilMovies={[]}
                setSuperMovies={function (): void {
                    throw new Error("Function not implemented.");
                }}
            />
        );
        const heading = screen.getByText(/AdminList/i);
        expect(heading).toBeInTheDocument();
    });
});
