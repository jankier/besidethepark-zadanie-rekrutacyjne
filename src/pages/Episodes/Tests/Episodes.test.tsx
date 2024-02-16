import "@testing-library/jest-dom/vitest";
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
import Episodes from "../Episodes.tsx";

type EpisodesData = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

type EpisodesDataRes = {
  results: EpisodesData[];
};

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Episodes", () => {
  it("render episodes page", async () => {
    const episode = createEpisodeData(
      32,
      "Edge of Tomorty: Rick, Die, Rickpeat",
      "November 10, 2019",
      "S04E01"
    );
    server.use(createGet([episode]));
    render(<Episodes />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("test-title-episodes-id").textContent).toBe(
      "Episodes of the 4th season of the series Rick and Morty"
    );
    expect(screen.getByAltText("Rick and Morty show image"));
    expect(await screen.findByText(episode.episode));

    screen.debug();
  });
});

const createEpisodeData = (
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

const createGet = (results: EpisodesData[]) => {
  return http.get<
    never,
    never,
    EpisodesDataRes,
    "https://rickandmortyapi.com/api/episode/"
  >("https://rickandmortyapi.com/api/episode/", async () => {
    return HttpResponse.json({
      results,
    });
  });
};
