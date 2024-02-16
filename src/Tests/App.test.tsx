import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import App from "../App.tsx";

type EpisodesData = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

type EpisodesDataRes = {
  results: EpisodesData[];
};

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

describe("App", () => {
  it("routing of the app", async () => {
    const user = userEvent.setup();
    const episode = createEpisodesData(
      32,
      "Edge of Tomorty: Rick, Die, Rickpeat",
      "November 10, 2019",
      "S04E01"
    );
    const episode_data = createEpisodeData(
      ["https://rickandmortyapi.com/api/character/1"],
      "S04E01"
    );
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
    const character = createCharactersData(1, "Rick Sanchez", "Human");
    server.use(createGetEpisodes([episode]));
    server.use(createGetEpisode(episode_data));
    server.use(createGetCharacterData(character_data));
    server.use(createGetCharacter([character]));
    render(<App />, { wrapper: BrowserRouter });
    const episodes_link = await screen.findByText(episode.episode);
    await user.click(episodes_link);
    const character_details_link = await screen.findByText(character.name);
    await user.click(character_details_link);
    const characters_button = await screen.findByText("Characters");
    await user.click(characters_button);
    const episodes_button = await screen.findByText("Episodes");
    await user.click(episodes_button);
    expect(screen.getByTestId("test-title-id").textContent).toBe(
      "Episodes of the 4th season of the series Rick and Morty"
    );
    screen.debug();
  });
});

const createEpisodesData = (
  id: number,
  name: string,
  air_date: string,
  episode: string
) => {
  return {
    id,
    name,
    air_date,
    episode,
  };
};

const createGetEpisodes = (results: EpisodesData[]) => {
  return http.get<
    never,
    never,
    EpisodesDataRes,
    "https://rickandmortyapi.com/api/episode/"
  >("https://rickandmortyapi.com/api/episode/", () => {
    return HttpResponse.json({
      results,
    });
  });
};

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
  >("https://rickandmortyapi.com/api/episode/:postId", () => {
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
  >(
    "https://rickandmortyapi.com/api/character/:postId",
    () => {
      return HttpResponse.json(character);
    },
    {
      once: true,
    }
  );
};

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
  >(
    "https://rickandmortyapi.com/api/character/:postId",
    () => {
      return HttpResponse.json(character_data);
    },
    {
      once: true,
    }
  );
};
