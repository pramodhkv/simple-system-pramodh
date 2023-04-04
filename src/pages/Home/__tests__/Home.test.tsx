import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../index";
import { mockedUsers } from "./mocked-data";
import { IUser } from "../../../types/interfaces";

const mockUseFetchUsers = jest.fn(() => ({
  users: [] as IUser[],
  loading: false,
  error: true,
  isFound: true,
  searchStr: "",
  fetchUsers: jest.fn(),
}));

jest.mock("../hooks", () => ({
  useFetchUsers: () => mockUseFetchUsers(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Home component", () => {
  test("renders Home component", () => {
    render(<Home />);
    const formElement = screen.getByTestId("form-text-input");
    expect(formElement).toBeInTheDocument();

    const searchInput = screen.getByTestId("search-input");
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("placeholder", "Enter username");

    const searchButton = screen.getByTestId("search-button");
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toBeDisabled();
  });

  test("renders info message when there is an error fetching users", async () => {
    render(<Home />);

    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockUseFetchUsers).toHaveBeenCalledTimes(1);
    });

    const infoMessage = screen.getByTestId("info-message");
    expect(infoMessage).toBeInTheDocument();
    expect(infoMessage).toHaveTextContent("Error fetching users");
  });

  test("renders info message when no users are found", async () => {
    mockUseFetchUsers.mockImplementationOnce(() => ({
      users: [],
      loading: false,
      error: false,
      isFound: false,
      searchStr: "test",
      fetchUsers: jest.fn(),
    }));

    render(<Home />);

    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockUseFetchUsers).toHaveBeenCalledTimes(1);
    });

    const infoMessage = screen.getByTestId("info-message");
    expect(infoMessage).toBeInTheDocument();
    expect(infoMessage).toHaveTextContent("No users found");
  });

  test("renders users when users are found", async () => {
    mockUseFetchUsers.mockImplementationOnce(() => ({
      users: mockedUsers,
      loading: false,
      error: false,
      isFound: true,
      searchStr: "test",
      fetchUsers: jest.fn(),
    }));

    render(<Home />);

    const searchInput = screen.getByTestId("search-input");
    const searchButton = screen.getByTestId("search-button");

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockUseFetchUsers).toHaveBeenCalledTimes(1);
    });

    const userDisclosureList = screen.getAllByTestId("user-disclosure");
    expect(userDisclosureList).toHaveLength(5);
  });
});
