import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import CharacterDetails from "../CharacterDetails.tsx";

type PathParams = {
  postId: string;
};

type CharacterData = {
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
};

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("CharacterDetails", () => {
  it("routing of the app", async () => {
    const character_data = createCharacterData(
      "Rick Sanchez",
      "Alive",
      "Human",
      "-",
      "Male",
      { name: "Earth (C-137)" },
      { name: "Citadel of Ricks" },
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    );
    server.use(createGetCharacterData(character_data));
    render(<CharacterDetails />, { wrapper: BrowserRouter });
    expect(await screen.findByText(character_data.name));
    const image = screen.getByAltText("image of character");
    console.log(image);
    expect(image).toHaveAttribute("src", character_data.image);
    expect(await screen.findByText(character_data.status));
    expect(await screen.findByText(character_data.species));
    expect(await screen.findByText(character_data.type));
    expect(await screen.findByText(character_data.origin.name));
    expect(await screen.findByText(character_data.location.name));

    screen.debug();
  });
});

const createCharacterData = (
  name: string,
  status: string,
  species: string,
  type: string,
  gender: string,
  origin: { name: string },
  location: { name: string },
  image: string
) => {
  return {
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
  };
};

const createGetCharacterData = (character_data: CharacterData) => {
  return http.get<
    PathParams,
    never,
    CharacterData,
    "https://rickandmortyapi.com/api/character/:postId"
  >("https://rickandmortyapi.com/api/character/:postId", async () => {
    return HttpResponse.json(character_data);
  });
};
