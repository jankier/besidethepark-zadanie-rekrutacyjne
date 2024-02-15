import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import Characters from "../Characters.tsx";

type PathParams = {
  postId: string;
};

type EpisodeData = {
  characters: string[];
  episode: string;
};

type CharactersData = {
  id: number;
  name: string;
  species: string;
};

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Characters", () => {
  it("render characters page", async () => {
    const episode_data = createEpisodeData(
      [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2",
      ],
      "S04E01"
    );
    const character = createCharactersData(1, "Rick Sanchez", "Human");
    server.use(createGetEpisode(episode_data));
    server.use(createGetCharacter([character]));
    render(<Characters />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("test-title-characters-id").textContent).toBe(
      "Characters of the episode of the 4th season of the series Rick and Morty"
    );
    expect(screen.getByAltText("Rick and Morty show image"));
    expect(await screen.findByText("1st"));
    expect(await screen.findByText(character.name));
    expect(await screen.findByText(character.species));
    screen.debug();
  });
});

const createEpisodeData = (characters: string[], episode: string) => {
  return {
    characters,
    episode,
  };
};

const createGetEpisode = (episode_data: EpisodeData) => {
  return http.get<
    PathParams,
    never,
    EpisodeData,
    "https://rickandmortyapi.com/api/episode/:postId"
  >("https://rickandmortyapi.com/api/episode/:postId", async () => {
    return HttpResponse.json(episode_data);
  });
};

const createCharactersData = (id: number, name: string, species: string) => {
  return {
    id,
    name,
    species,
  };
};

const createGetCharacter = (character: CharactersData[]) => {
  return http.get<
    PathParams,
    never,
    CharactersData[],
    "https://rickandmortyapi.com/api/character/:postId"
  >("https://rickandmortyapi.com/api/character/:postId", async () => {
    return HttpResponse.json(character);
  });
};
