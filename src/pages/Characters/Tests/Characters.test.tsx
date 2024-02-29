import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GET_CHARACTERS } from "../../../GraphQL/Queries";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import FetchingError from "../../../components/FetchingError/FetchingError.tsx";
import Characters from "../Characters.tsx";

describe("Characters", () => {
  it("render loading screen and characters page", async () => {
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
    render(
      <MockedProvider mocks={[charactersMock]} addTypename={false}>
        <ErrorBoundary FallbackComponent={FetchingError}>
          <Characters />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-characters-id"));
    expect(await screen.findByText("1st"));
    expect(await screen.findByText("Rick Sanchez"));
    expect(await screen.findByText("Human"));
    screen.debug();
  });
  const charactersNetworkErrorMock = {
    delay: 30,
    request: {
      query: GET_CHARACTERS,
    },
    variableMatcher: () => true,
    error: new Error("Network error occured"),
  };
  it("simulate network error", async () => {
    render(
      <MockedProvider mocks={[charactersNetworkErrorMock]} addTypename={false}>
        <ErrorBoundary FallbackComponent={FetchingError}>
          <Characters />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-characters-id"));
    expect(await screen.findByText("Network error occured"));

    screen.debug();
  });

  const charactersGraphQLErrorMock = {
    delay: 30,
    request: {
      query: GET_CHARACTERS,
    },
    variableMatcher: () => true,
    result: {
      errors: [new GraphQLError("GraphQL error occured")],
    },
  };
  it("simulate GraphQL error", async () => {
    render(
      <MockedProvider mocks={[charactersGraphQLErrorMock]} addTypename={false}>
        <ErrorBoundary FallbackComponent={FetchingError}>
          <Characters />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-characters-id"));
    expect(await screen.findByText("GraphQL error occured"));

    screen.debug();
  });
});
