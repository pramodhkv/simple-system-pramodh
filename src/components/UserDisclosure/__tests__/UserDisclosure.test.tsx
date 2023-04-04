import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserDisclosure from "../index";
import { mockUser, mockRepositories } from "./mocked-data";

describe("UserDisclosure", () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockRepositories),
      })
    );
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should render the user's profile info", () => {
    render(<UserDisclosure user={mockUser} />);

    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: mockUser.login })
    ).toBeInTheDocument();
  });

  test("should show repositories when user is clicked", async () => {
    render(<UserDisclosure user={mockUser} />);

    fireEvent.click(screen.getByText(mockUser.login));

    await screen.findByText(mockRepositories[0].name);

    expect(
      screen.getByText(mockRepositories[0].description)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`${mockRepositories[0].stargazers_count}`)
    ).toBeInTheDocument();

    expect(screen.getByText(mockRepositories[1].name)).toBeInTheDocument();
  });

  test("should hide repositories when user is clicked twice", async () => {
    render(<UserDisclosure user={mockUser} />);

    fireEvent.click(screen.getByText(mockUser.login));

    await screen.findByText(mockRepositories[0].name);

    expect(
      screen.getByText(mockRepositories[0].description)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText(mockUser.login));

    await waitFor(() =>
      expect(
        screen.queryByText(mockRepositories[0].name)
      ).not.toBeInTheDocument()
    );
  });
});
