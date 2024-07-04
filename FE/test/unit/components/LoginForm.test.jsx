import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginForm from "../../../src/components/LoginForm";
import { login } from "../../../src/services/auth.service";

describe("LoginForm", () => {
  beforeEach(() => {
    vi.mock("../../../src/services/auth.service", () => ({
      login: vi.fn(() => Promise.resolve({ error: "Invalid credentials" })),
    }));
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
  });

  it("updates the email input value", () => {
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
    expect(emailInput.value).toBe("test@mail.com");
  });

  it("updates the password input value", () => {
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(passwordInput.value).toBe("password");
  });

  it("disables the login button when the input is empty", () => {
    const loginButton = screen.getByRole("button", { name: "Login" });
    expect(loginButton).toBeDisabled();
  });

  it("enables the login button when the input is not empty", () => {
    const loginButton = screen.getByRole("button", { name: "Login" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(emailInput, { target: { value: "hello@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(loginButton).toBeEnabled();
  });

  it.skip("returns an error message when the login fails", async () => {
    const email = "notregistered@mail.com";
    const password = "password123!";
    const loginButton = screen.getByRole("button", { name: "Login" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    await vi.waitFor(() => {
      expect(screen.findByText("Invalid credentials")).toBeInTheDocument();
    });
  });

  it("redirects to the home page when the login is successful", async () => {
    const email = "test@mail.com";
    const password = "password";
    const loginButton = screen.getByRole("button", { name: "Login" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.click(loginButton);

    await vi.waitFor(() => {
      expect(window.location.pathname).toBe("/");
    });
  });
});
