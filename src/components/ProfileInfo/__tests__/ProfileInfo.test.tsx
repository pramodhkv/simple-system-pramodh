import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProfileInfo from "..";

describe("ProfileInfo", () => {
  test("renders ProfileInfo component", () => {
    const mockedUser = {
      id: "1",
      login: "user1",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    };

    render(
      <ProfileInfo
        imgSrc={mockedUser.avatar_url}
        alt={mockedUser.login}
        text={mockedUser.login}
      />
    );

    expect(screen.getByText(mockedUser.login)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: mockedUser.login })
    ).toBeInTheDocument();
  });
});
