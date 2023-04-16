import { findByText, render, screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import userEvent from "@testing-library/user-event";
import PaymentForm from "./payment-form.component";

describe("PaymentForm component", () => {
  describe("when rendering default", () => {
    it("should render all the inputs", () => {
      renderWithReactHookForm(
        <PaymentForm
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const textboxNumber = screen.getByRole("textbox", {
        name: "Número de la tarjeta",
      });
      const textboxNameOnCard = screen.getByRole("textbox", {
        name: "Nombre como figura en la tarjeta",
      });
      const textboxExpDate = screen.getByRole("textbox", {
        name: "Fecha expiración",
      });
      const textboxCVC = screen.getByLabelText("CVC");

      expect(textboxNumber).toBeInTheDocument();
      expect(textboxNameOnCard).toBeInTheDocument();
      expect(textboxExpDate).toBeInTheDocument();
      expect(textboxCVC).toBeInTheDocument();
    });
  });

  it("should have the input address1 by default", () => {
    renderWithReactHookForm(
      <PaymentForm activeStep={1} handleNext={() => {}} handleBack={() => {}} />
    );

    const textboxName = screen.getByRole("textbox", {
      name: "Número de la tarjeta",
    });
    expect(textboxName).toHaveFocus();
  });

  describe("when the user complete an input", () => {
    it("should render the data", async () => {
      renderWithReactHookForm(
        <PaymentForm
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const textboxNumber = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Número de la tarjeta",
      });
      const textboxNameOnCard = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Nombre como figura en la tarjeta",
      });
      const textboxExpDate = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Fecha expiración",
      });
      const textboxCVC = screen.getByLabelText<HTMLInputElement>("CVC");

      await userEvent.type(textboxNumber, "237823892");
      await userEvent.type(textboxNameOnCard, "sol");
      await userEvent.type(textboxExpDate, "0212");
      await userEvent.type(textboxCVC, "111");

      expect(textboxNumber.value).toBe("237823892");
      expect(textboxNameOnCard.value).toBe("sol");
      expect(textboxExpDate.value).toBe("0212");
      expect(textboxCVC.value).toBe("111");
    });
  });
});
