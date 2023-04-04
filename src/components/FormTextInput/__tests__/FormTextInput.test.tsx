import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormTextInput from "..";

describe("FormTextInput", () => {
  test("renders FormTextInput component", () => {
    const onSubmitMock = jest.fn();
    render(<FormTextInput onSubmit={onSubmitMock} />);

    const formElement = screen.getByTestId("form-text-input");
    expect(formElement).toBeInTheDocument();

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Enter username");

    const searchButton = screen.getByTestId("search-button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toBeDisabled();
  });

  test("onSubmit function should be called with search string on form submit", () => {
    const onSubmitMock = jest.fn();
    render(<FormTextInput onSubmit={onSubmitMock} />);

    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    expect(onSubmitMock).toHaveBeenCalledWith("test");
  });
});
