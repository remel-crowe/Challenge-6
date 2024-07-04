import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import RegisterForm from "../../../src/components/RegisterForm";
import { register } from "../../../src/services/auth.service";

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.mock("../../../src/services/auth.service", () => ({
      register: vi.fn().mockResolvedValue({ status: 200 }),
    }));
    render(
      <MemoryRouter>
        <RegisterForm />
      </MemoryRouter>
    );
  });

  it("updates the name input value", () => {
    const nameInput = screen.getByRole("textbox", { name: "Name" });
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput.value).toBe("test");
  });

  it("updates the email input value", () => {
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailInput, { target: { value: "" } });
    expect(emailInput.value).toBe("");
  });
  it("updates the password input value", () => {
    const passwordInput = screen.getByLabelText(/^Password$/i);
    fireEvent.change(passwordInput, {
      target: { value: "password" },
    });
    expect(passwordInput.value).toBe("password");
  });

  it("disables the sign up button when the input is empty", () => {
    const signUpButton = screen.getByRole("button");
    expect(signUpButton).toBeDisabled();
  });

  it(" shows an error when the passwords do not match", () => {
    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^Confirm password$/i);
    const signUpButton = screen.getByRole("button", { name: "Register" });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "mail@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "differentPassword" },
    });
    fireEvent.click(signUpButton);
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  it("Shows an error when the password isnt strong enough", () => {
    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^Confirm password$/i);
    const signUpButton = screen.getByRole("button", { name: "Register" });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "mail@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password" },
    });
    fireEvent.click(signUpButton);
    expect(
      screen.getByText(
        "Password must contain at least 8 characters, an uppercase letter, one lowercase letter, one number, and one special character."
      )
    ).toBeInTheDocument();
  });

  it("displays a success message when the registration is successful", async () => {
    const nameInput = screen.getByRole("textbox", { name: "Name" });
    const emailInput = screen.getByRole("textbox", { name: "Email" });
    const passwordInput = screen.getByLabelText(/^Password$/i);
    const confirmPasswordInput = screen.getByLabelText(/^Confirm password$/i);
    const signUpButton = screen.getByRole("button", { name: "Register" });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "test@mail.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Password123!" },
    });
    fireEvent.click(signUpButton);
    await vi.waitFor(() => {
      expect(
        screen.getByText("Successful! Redirecting to login page...")
      ).toBeInTheDocument();
    });
  });
});
