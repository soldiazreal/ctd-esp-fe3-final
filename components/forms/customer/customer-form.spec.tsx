import { screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import userEvent from "@testing-library/user-event";
import CustomerDataForm from "./customer-data-form.component";

const defaultData = {
  name: "",
  lastname: "",
  email: "",
  address: {
    address: "",
    department: "",
    city: "",
    state: "",
    zipCode: "",
  },
};

describe("CustomerForm component", () => {
  describe("when rendering default", () => {
    it("should render all the inputs", () => {
      renderWithReactHookForm(
        <CustomerDataForm
          data={defaultData}
          activeStep={0}
          handleNext={() => {}}
        />
      );

      const textboxName = screen.getByRole("textbox", { name: "Nombre" });
      const textboxLastname = screen.getByRole("textbox", { name: "Apellido" });
      const textboxEmail = screen.getByRole("textbox", { name: "Email" });

      expect(textboxName).toBeInTheDocument();
      expect(textboxLastname).toBeInTheDocument();
      expect(textboxEmail).toBeInTheDocument();
    });
  });

  it("should have the input name focused by default", () => {
    renderWithReactHookForm(
      <CustomerDataForm
        data={defaultData}
        activeStep={0}
        handleNext={() => {}}
      />
    );
    const textboxName = screen.getByRole("textbox", { name: "Nombre" });
    expect(textboxName).toHaveFocus();
  });

  describe("when the user complete an input", () => {
    it("should render the data", async () => {
      renderWithReactHookForm(
        <CustomerDataForm
          data={defaultData}
          activeStep={0}
          handleNext={() => {}}
        />
      );

      const textboxName = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Nombre",
      });
      const textboxLastname = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Apellido",
      });
      const textboxEmail = screen.getByRole<HTMLInputElement>("textbox", {
        name: "Email",
      });

      await userEvent.type(textboxName, "sol");
      await userEvent.type(textboxLastname, "dr");
      await userEvent.type(textboxEmail, "sol@gmail.com");

      expect(textboxName.value).toBe("sol");
      expect(textboxLastname.value).toBe("dr");
      expect(textboxEmail.value).toBe("sol@gmail.com");
    });
  });
});
