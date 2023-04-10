import { render, screen } from "@testing-library/react";
import AccordionCollapsible from "./collapsible.component";
import userEvent from "@testing-library/user-event";

const mockedData = {
  title: "Title",
  children: <div>Children data</div>,
};

describe("Collapsible component", () => {
  describe("when rendering default component", () => {
    it("should render the title", () => {
      render(
        <AccordionCollapsible title={mockedData.title}>
          {mockedData.children}
        </AccordionCollapsible>
      );

      const title = screen.getByText("Title");
      expect(title).toBeInTheDocument();
    });

    it("should not show the content by default", () => {
      render(
        <AccordionCollapsible title={mockedData.title}>
          {mockedData.children}
        </AccordionCollapsible>
      );

      const content = screen.getByText("Children data");
      expect(content).not.toBeVisible();
    });
  });

  describe("when the user clicks on the title", () => {
    it("should show the content", async () => {
      render(
        <AccordionCollapsible title={mockedData.title}>
          {mockedData.children}
        </AccordionCollapsible>
      );
      const title = screen.getByText("Title");
      await userEvent.click(title);

      const content = await screen.findByText("Children data");
      expect(content).toBeVisible();
    });
  });
});
