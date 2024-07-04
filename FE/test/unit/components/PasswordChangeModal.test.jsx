import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import PasswordChangeModal from "../../../src/components/PasswordChangeModal";
import { changePassword } from "../../../src/services/auth.service";

vi.mock("../../../src/services/auth.service.js", () => ({
  changePassword: vi.fn(),
}));

describe("PasswordChangeModal", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <PasswordChangeModal />
      </MemoryRouter>
    );
  });

  it("should render the modal", () => {
    expect(screen.getByText("Change!")).toBeTruthy();
  });

  it("updates the password input value", () => {
    const passwordInput = screen.getByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "password" } });
    expect(passwordInput.value).toBe("password");
  });

  it("updates the new password input value", () => {
    const newPasswordInput = screen.getByLabelText("New Password:");
    fireEvent.change(newPasswordInput, { target: { value: "Password123!" } });
    expect(newPasswordInput.value).toBe("Password123!");
  });

  it("disables the change button if the input is empty", () => {
    const changeButton = screen.getByText("Change!");
    expect(changeButton).toBeDisabled();
  });

  it("enables the change password button when the input is not empty", () => {
    const changePasswordButton = screen.getByRole("button");
    const passwordInput = screen.getByLabelText(/^Password:$/i);
    const newPasswordInput = screen.getByLabelText(/^New Password:$/i);
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(newPasswordInput, { target: { value: "newpassword" } });
    expect(changePasswordButton).toBeEnabled();
  });

  it("displays an error message when the form submission fails", async () => {
    changePassword.mockRejectedValue(new Error("Password change failed"));
    const passwordInput = screen.getByLabelText(/^Password:$/i);
    const newPasswordInput = screen.getByLabelText(/^New Password:$/i);
    const changePasswordButton = screen.getByRole("button");
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.change(newPasswordInput, { target: { value: "password" } });
    fireEvent.click(changePasswordButton);
    await waitFor(() => {
      expect(
        screen.getByText(
          /Password must contain at least 8 characters, an uppercase letter, one lowercase letter, one number, and one special character./i
        )
      ).toBeInTheDocument();
    });
  });

  it("displays a success message when the form submission is successful", async () => {
    changePassword.mockResolvedValue();
    const passwordInput = screen.getByLabelText(/^Password:$/i);
    const newPasswordInput = screen.getByLabelText(/^New Password:$/i);
    const changePasswordButton = screen.getByRole("button");
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(newPasswordInput, {
      target: { value: "Password1234!" },
    });
    fireEvent.click(changePasswordButton);
    await waitFor(() => {
      expect(
        screen.getByText(/Password Changed Successfully/i)
      ).toBeInTheDocument();
    });
  });
});
