import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import {
  GET_EPISODES,
  GET_CHARACTERS,
  GET_CHARACTER_DATA,
} from "../GraphQL/Queries.ts";
import { MockedProvider } from "@apollo/client/testing";
import { ErrorBoundary } from "react-error-boundary";
import FetchingError from "../components/FetchingError/FetchingError.tsx";
import App from "../App.tsx";

const episodesMock = {
  delay: 30,
  request: {
    query: GET_EPISODES,
    variables: {
      episodeFilter: "S04",
    },
  },
  result: {
    data: {
      episodes: {
        results: [
          {
            id: 32,
            name: "Edge of Tomorty: Rick, Die, Rickpeat",
            air_date: "November 10, 2019",
            episode: "S04E01",
          },
        ],
      },
    },
  },
};

const charactersMock = {
  delay: 30,
  request: {
    query: GET_CHARACTERS,
  },
  variableMatcher: () => true,
  result: {
    data: {
      episode: {
        episode: "S04E01",
        characters: [{ id: 1, name: "Rick Sanchez", species: "Human" }],
      },
    },
  },
};

const characterDetailsMock = {
  delay: 30,
  request: {
    query: GET_CHARACTER_DATA,
  },
  variableMatcher: () => true,
  result: {
    data: {
      character: {
        gender: "Male",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        location: {
          name: "Citadel of Ricks",
        },
        name: "Rick Sanchez",
        origin: {
          name: "Earth (C-137)",
        },
        species: "Human",
        status: "Alive",
        type: "",
      },
    },
  },
};

describe("App", () => {
  it("loading screen and routing of the app", async () => {
    const user = userEvent.setup();

    render(
      <MockedProvider
        mocks={[episodesMock, charactersMock, characterDetailsMock]}
        addTypename={false}
      >
        <ErrorBoundary FallbackComponent={FetchingError}>
          <App />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-episodes-id"));
    const episodes_link = await screen.findByText("S04E01");
    await user.click(episodes_link);
    expect(screen.getByTestId("loader-characters-id"));
    const character_details_link = await screen.findByText("Rick Sanchez");
    await user.click(character_details_link);
    expect(screen.getByTestId("loader-character-details-id"));
    const characters_button = await screen.findByText("Characters");
    await user.click(characters_button);
    const episodes_button = await screen.findByText("Episodes");
    await user.click(episodes_button);
    expect(await screen.findByText("Edge of Tomorty: Rick, Die, Rickpeat"));
    screen.debug();
  });
});
