import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { GET_CHARACTER_DATA } from "../../../GraphQL/Queries";
import { MockedProvider } from "@apollo/client/testing";
import { GraphQLError } from "graphql";
import { ErrorBoundary } from "react-error-boundary";
import FetchingError from "../../../components/FetchingError/FetchingError.tsx";
import CharacterDetails from "../CharacterDetails.tsx";

describe("CharacterDetails", () => {
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
  it("render loading screen and character details page", async () => {
    render(
      <MockedProvider mocks={[characterDetailsMock]} addTypename={false}>
        <ErrorBoundary FallbackComponent={FetchingError}>
          <CharacterDetails />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-character-details-id"));
    expect(await screen.findByText("Rick Sanchez"));
    expect(await screen.findByText("Alive"));
    expect(await screen.findByText("-"));
    expect(await screen.findByText("Human"));
    expect(await screen.findByText("Citadel of Ricks"));
    expect(await screen.findByText("Earth (C-137)"));
    const image = screen.getByAltText("image of character");
    expect(image).toHaveAttribute(
      "src",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    );

    screen.debug();
  });

  const characterDetailsNetworkErrorMock = {
    delay: 30,
    request: {
      query: GET_CHARACTER_DATA,
    },
    variableMatcher: () => true,
    error: new Error("Network error occured"),
  };
  it("simulate network error", async () => {
    render(
      <MockedProvider
        mocks={[characterDetailsNetworkErrorMock]}
        addTypename={false}
      >
        <ErrorBoundary FallbackComponent={FetchingError}>
          <CharacterDetails />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-character-details-id"));
    expect(await screen.findByText("Network error occured"));

    screen.debug();
  });

  const characterDetailsGraphQLErrorMock = {
    delay: 30,
    request: {
      query: GET_CHARACTER_DATA,
    },
    variableMatcher: () => true,
    result: {
      errors: [new GraphQLError("GraphQL error occured")],
    },
  };
  it("simulate GraphQL error", async () => {
    render(
      <MockedProvider
        mocks={[characterDetailsGraphQLErrorMock]}
        addTypename={false}
      >
        <ErrorBoundary FallbackComponent={FetchingError}>
          <CharacterDetails />
        </ErrorBoundary>
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );
    expect(screen.getByTestId("loader-character-details-id"));
    expect(await screen.findByText("GraphQL error occured"));

    screen.debug();
  });
});
