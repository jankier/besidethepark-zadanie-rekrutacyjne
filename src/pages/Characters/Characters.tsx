import { useEffect, useState } from "react";
import { useURLID } from "../../hooks/useURLID";
import { Link, useNavigate } from "react-router-dom";
import title_img from "../../assets/image.png";
import "./Characters.css";

type CharacterData = {
  id: number;
  name: string;
  species: string;
};

const Characters = () => {
  const navigate = useNavigate();

  const { id } = useURLID();

  const [episodeNum, setEpisodeNum] = useState<undefined | string>();

  const [characters, setCharacters] = useState<undefined[] | CharacterData[]>(
    []
  );

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const episode_res = await fetch(
          `https://rickandmortyapi.com/api/episode/${id}`
        ).then((episode_res) => episode_res.json());
        setEpisodeNum(episode_res.episode.split("E").pop());

        const char_ids = episode_res.characters
          .map((character: string) => character.split("/").pop())
          .join(",");

        const character_res = await fetch(
          `https://rickandmortyapi.com/api/character/${char_ids}`
        ).then((character_res) => character_res.json());
        setCharacters(character_res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCharacters();
  }, [id]);

  let episode_num = "";

  const episodeNumFormat = () => {
    if (episodeNum !== undefined) {
      const ep_num = parseInt(episodeNum, 10);
      if (ep_num === 1) {
        episode_num = ep_num + "st";
      } else if (ep_num === 2) {
        episode_num = ep_num + "nd";
      } else if (ep_num === 3) {
        episode_num = ep_num + "rd";
      } else {
        episode_num = ep_num + "th";
      }
      return episode_num;
    }
  };

  episodeNumFormat();

  return (
    <section className="characters">
      <div className="characters-left">
        <button
          className="back-button characters-button"
          onClick={() => navigate("/episodes")}
        >
          <svg
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.83331 9.66671L4.12621 10.3738L3.4191 9.66671L4.1262 8.9596L4.83331 9.66671ZM10.875 23.9584C10.3227 23.9584 9.87498 23.5107 9.87498 22.9584C9.87498 22.4061 10.3227 21.9584 10.875 21.9584L10.875 23.9584ZM10.1679 16.4155L4.12621 10.3738L5.54042 8.9596L11.5821 15.0013L10.1679 16.4155ZM4.1262 8.9596L10.1679 2.91793L11.5821 4.33215L5.54042 10.3738L4.1262 8.9596ZM4.83331 8.66671L17.5208 8.66671L17.5208 10.6667L4.83331 10.6667L4.83331 8.66671ZM17.5208 23.9584L10.875 23.9584L10.875 21.9584L17.5208 21.9584L17.5208 23.9584ZM25.1666 16.3125C25.1666 20.5352 21.7435 23.9584 17.5208 23.9584L17.5208 21.9584C20.6389 21.9584 23.1666 19.4306 23.1666 16.3125L25.1666 16.3125ZM17.5208 8.66671C21.7435 8.66671 25.1666 12.0899 25.1666 16.3125L23.1666 16.3125C23.1666 13.1944 20.6389 10.6667 17.5208 10.6667L17.5208 8.66671Z"
              fill="#33363F"
            />
          </svg>
          <span className="text text-400">Episodes</span>
        </button>
        <div
          data-testid="test-title-characters-id"
          className="characters-title"
        >
          <span className="text text-400 characters-title-text-black">
            Characters of the <span className="text-700">{episode_num}</span>
            <br></br>
            episode of the <span className="text-700">4th </span>
          </span>
          <span className="text text-400 characters-title-text-black-last">
            season of the series{" "}
          </span>
          <span className="text characters-title-text-cyan text-700">
            Rick and Morty
          </span>
        </div>
        <div className="characters-img">
          <img src={title_img} alt="Rick and Morty show image" />
        </div>
      </div>
      <div className="characters-right">
        {characters.map((character) => {
          if (character === undefined) {
            console.log(character);
          }
          return (
            <Link
              key={character?.id}
              className="characters-character text text-700"
              state={{ fromSpecificPage: true }}
              to={`/character-detials/${character?.id}`}
            >
              <div className="characters-info">
                <div className="characters-name">{character?.name}</div>
                <div className="characters-species">{character?.species}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Characters;
