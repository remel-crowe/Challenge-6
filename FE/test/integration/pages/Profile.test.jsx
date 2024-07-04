import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { login } from "../../../src/services/auth.service";

import Profile from "../../../src/pages/Profile";

vi.mock("../../../src/services/auth.service", () => ({
  login: vi.fn().mockResolvedValue({ name: "Test User" }),
}));

describe("Profile", () => {
  beforeEach(async () => {
    const user = await login("test@example.com", "password123!");
    render(
      <MemoryRouter>
        <Profile user={user.name} />
      </MemoryRouter>
    );
  });

  it("shows the user's name", () => {
    const name = screen.getByText("Test User's Profile");
    expect(name).toBeInTheDocument();
  });

  it("shows the password change modal when the button is clicked", () => {
    const changePasswordButton = screen.getByRole("button", {
      name: "Change Password",
    });
    fireEvent.click(changePasswordButton);
    const modal = screen.getByRole("button", { name: "Change!" });
    expect(modal).toBeInTheDocument();
  });
});
