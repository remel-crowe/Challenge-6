import { describe, it, expect, beforeEac, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import AddCarModal from "../../../src/components/AddCarModal";

describe("AddCarModal", () => {
  let mockOnAdd;
  let mockOnClose;
  beforeEach(() => {
    mockOnAdd = vi.fn();
    mockOnClose = vi.fn();
    render(
      <MemoryRouter>
        <AddCarModal onAdd={mockOnAdd} onClose={mockOnClose} />
      </MemoryRouter>
    );
  });

  it("should render the modal", () => {
    expect(screen.getByText("Add Car")).toBeTruthy();
  });

  it("updates the make input value", () => {
    const makeInput = screen.getByLabelText("Make");
    fireEvent.change(makeInput, { target: { value: "Tesla" } });
    expect(makeInput.value).toBe("Tesla");
  });

  it("updates the model input value", () => {
    const modelInput = screen.getByLabelText("Model");
    fireEvent.change(modelInput, { target: { value: "Model S" } });
    expect(modelInput.value).toBe("Model S");
  });

  it("updates the maxMiles input value", () => {
    const maxMilesInput = screen.getByLabelText("Max Miles");
    fireEvent.change(maxMilesInput, { target: { value: "300" } });
    expect(maxMilesInput.value).toBe("300");
  });

  it("adds a car when the form is submitted", async () => {
    mockOnAdd.mockResolvedValue({
      make: "Tesla",
      model: "Model S",
      maxMiles: 300,
      charge: 100,
      fastCharge: "true",
    });
    const makeInput = screen.getByLabelText("Make");
    const modelInput = screen.getByLabelText("Model");
    const maxMilesInput = screen.getByLabelText("Max Miles");
    const chargeInput = screen.getByLabelText("Charge");
    const fastChargeInput = screen.getByLabelText("FastChargeTrue");
    const submitButton = screen.getByRole("button");
    fireEvent.change(makeInput, { target: { value: "Tesla" } });
    fireEvent.change(modelInput, { target: { value: "Model S" } });
    fireEvent.change(maxMilesInput, { target: { value: 300 } });
    fireEvent.change(chargeInput, { target: { value: 100 } });
    fireEvent.click(fastChargeInput);
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith({
        make: "Tesla",
        model: "Model S",
        maxMiles: "300",
        charge: "100",
        fastCharge: "true",
      });
    });
  });
});
