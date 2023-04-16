import { screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import userEvent from "@testing-library/user-event";
import DeliveryForm from "./delivery-form.component";

const defaultData = {
  address: "",
  department:"",
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

      const textboxAddress = screen.getByRole("textbox", {
        name: "Dirección",
      });
      const textboxcity = screen.getByRole("textbox", { name: "Ciudad" });
      const textboxState = screen.getByRole("textbox", { name: "Provincia" });
      const textboxZipCode = screen.getByRole("textbox", {
        name: "Código postal",
      });

      expect(textboxAddress).toBeInTheDocument();
      expect(textboxcity).toBeInTheDocument();
      expect(textboxState).toBeInTheDocument();
      expect(textboxZipCode).toBeInTheDocument();
    });
  });

  it("should have the input address by default", () => {
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

      const textboxAddress = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Dirección",
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

      await userEvent.type(textboxAddress, "calle falsa");
      await userEvent.type(textboxcity, "bs as");
      await userEvent.type(textboxState, "bs as");
      await userEvent.type(textboxZipCode, "3421");

      expect(textboxAddress.value).toBe("calle falsa");
      expect(textboxcity.value).toBe("bs as");
      expect(textboxState.value).toBe("bs as");
      expect(textboxZipCode.value).toBe("3421");
    });
  });
});
