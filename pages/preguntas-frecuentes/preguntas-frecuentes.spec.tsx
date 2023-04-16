import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Faqs from "dh-marvel/pages/preguntas-frecuentes/index.page";

describe("FaqsPage", () => {
  describe("when rendering default page", () => {
    it("should render the title", () => {
      render(<Faqs faqs={[]} />);
      const title = screen.getByText("Preguntas Frecuentes");
      expect(title).toBeInTheDocument();
    });

  });
});
