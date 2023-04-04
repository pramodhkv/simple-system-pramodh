import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RepositoryInfo from "..";

describe("RepositoryInfo", () => {
  test("renders RepositoryInfo component", () => {
    const mockedRepository = {
      id: 1,
      name: "repo1",
      description: "This is repository 1",
      html_url: "https://github.com/user/repo1",
      stargazers_count: 10,
    };

    render(
      <RepositoryInfo
        name={mockedRepository.name}
        description={mockedRepository.description}
        link={mockedRepository.html_url}
        stars={mockedRepository.stargazers_count}
      />
    );

    const anchorElement = screen.getByRole("link");
    expect(anchorElement).toHaveAttribute("href", mockedRepository.html_url);

    expect(screen.getByText(mockedRepository.name)).toBeInTheDocument();
    expect(screen.getByText(mockedRepository.description)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockedRepository.stargazers_count}`)
    ).toBeInTheDocument();
  });
});
