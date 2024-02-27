import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query EpisodesData($episodeFilter: String) {
    episodes(filter: { episode: $episodeFilter }) {
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export const GET_CHARACTERS = gql`
  query CharactersData($id: ID!) {
    episode(id: $id) {
      episode
      characters {
        id
        name
        species
      }
    }
  }
`;

export const GET_CHARACTER_DATA = gql`
  query CharacterData($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
    }
  }
`;
