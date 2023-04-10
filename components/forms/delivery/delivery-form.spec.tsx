import { screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import userEvent from "@testing-library/user-event";
import DeliveryForm from "./delivery-form.component";

const defaultData = {
  address1: "",
  address2: null,
  city: "",
  state: "",
  zipCode: "",
};

describe("Delivery component", () => {
  describe("when rendering default", () => {
    it("should render all the inputs", () => {
      renderWithReactHookForm(
        <DeliveryForm
          data={defaultData}
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const textboxAddress1 = screen.getByRole("textbox", {
        name: "Dirección",
      });
      const textboxAddress2 = screen.getByRole("textbox", {
        name: "Dirección alternativa",
      });
      const textboxcity = screen.getByRole("textbox", { name: "Ciudad" });
      const textboxState = screen.getByRole("textbox", { name: "Provincia" });
      const textboxZipCode = screen.getByRole("textbox", {
        name: "Código postal",
      });

      expect(textboxAddress1).toBeInTheDocument();
      expect(textboxAddress2).toBeInTheDocument();
      expect(textboxcity).toBeInTheDocument();
      expect(textboxState).toBeInTheDocument();
      expect(textboxZipCode).toBeInTheDocument();
    });
  });

  it("should have the input address1 by default", () => {
    renderWithReactHookForm(
      <DeliveryForm
        data={defaultData}
        activeStep={1}
        handleNext={() => {}}
        handleBack={() => {}}
      />
    );

    const textboxName = screen.getByRole("textbox", { name: "Dirección" });
    expect(textboxName).toHaveFocus();
  });

  describe("user complete an input", () => {
    it("should render the data", async () => {
      renderWithReactHookForm(
        <DeliveryForm
          data={defaultData}
          activeStep={1}
          handleNext={() => {}}
          handleBack={() => {}}
        />
      );

      const textboxAddress1 = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Dirección",
      });
      const textboxAddress2 = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Dirección alternativa",
      });
      const textboxcity = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Ciudad",
      });
      const textboxState = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Provincia",
      });
      const textboxZipCode = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Código postal",
      });

      await userEvent.type(textboxAddress1, "calle falsa");
      await userEvent.type(textboxAddress2, "calle verdadera");
      await userEvent.type(textboxcity, "bs as");
      await userEvent.type(textboxState, "bs as");
      await userEvent.type(textboxZipCode, "3421");

      expect(textboxAddress1.value).toBe("calle falsa");
      expect(textboxAddress2.value).toBe("calle verdadera");
      expect(textboxcity.value).toBe("bs as");
      expect(textboxState.value).toBe("bs as");
      expect(textboxZipCode.value).toBe("3421");
    });
  });
});
