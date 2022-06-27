import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Home from "./Home";
import { BrowserRouter } from "react-router-dom";

test("render content", () => {
  const component = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  component.getByText("Welcome to the dogs page");
  component.getByText("Search dog breeds");
  component.getByText("Create your dog breed");
});
