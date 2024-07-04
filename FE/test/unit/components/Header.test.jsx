import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Header from "../../../src/components/Header";

describe("Header", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  });

  it("renders the header", () => {
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("renders the logo", () => {
    const logo = screen.getByRole("img", { name: "PowerTrip" });
    expect(logo).toBeInTheDocument();
  });

  it("renders the sign in button", () => {
    const signInButton = screen.getByRole("button", { name: "Sign In" });
    expect(signInButton).toBeInTheDocument();
  });

  it("renders the garage header if a user is logged in", () => {
    render(
      <MemoryRouter>
        <Header user={{ name: "Test User" }} />
      </MemoryRouter>
    );
    expect(screen.getByText("Garage")).toBeInTheDocument();
  });
});
