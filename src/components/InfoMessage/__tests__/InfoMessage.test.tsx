import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoMessage from "../index";

describe("InfoMessage", () => {
  test("renders InfoMessage component", () => {
    render(<InfoMessage message="test" />);

    const infoMessage = screen.getByTestId("info-message");
    expect(infoMessage).toHaveTextContent("test");
  });
});
