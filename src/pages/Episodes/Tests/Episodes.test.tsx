import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GET_EPISODES } from "../../../GraphQL/Queries";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { ErrorBoundary } from "react-error-boundary";
import FetchingError from "../../../components/FetchingError/FetchingError.tsx";
import Episodes from "../Episodes.tsx";

describe("Episodes", () => {
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
  it("render loading screen and episodes page", async () => {
    render(
      <MockedProvider mocks={[episodesMock]} addTypename={false}>
        <ErrorBoundary FallbackComponent={FetchingError}>
          <Episodes />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-episodes-id"));
    expect(await screen.findByText("Edge of Tomorty: Rick, Die, Rickpeat"));
    expect(await screen.findByText("S04E01"));

    screen.debug();
  });

  const episodesNetworkErrorMock = {
    delay: 30,
    request: {
      query: GET_EPISODES,
      variables: {
        episodeFilter: "S04",
      },
    },
    error: new Error("Network error occured"),
  };
  it("simulate network error", async () => {
    render(
      <MockedProvider mocks={[episodesNetworkErrorMock]} addTypename={false}>
        <ErrorBoundary FallbackComponent={FetchingError}>
          <Episodes />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-episodes-id"));
    expect(await screen.findByText("Network error occured"));

    screen.debug();
  });

  const episodesGraphQLErrorMock = {
    delay: 30,
    request: {
      query: GET_EPISODES,
      variables: {
        episodeFilter: "S04",
      },
    },
    result: {
      errors: [new GraphQLError("GraphQL error occured")],
    },
  };
  it("simulate GraphQL error", async () => {
    render(
      <MockedProvider mocks={[episodesGraphQLErrorMock]} addTypename={false}>
        <ErrorBoundary FallbackComponent={FetchingError}>
          <Episodes />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-episodes-id"));
    expect(await screen.findByText("GraphQL error occured"));

    screen.debug();
  });
});
