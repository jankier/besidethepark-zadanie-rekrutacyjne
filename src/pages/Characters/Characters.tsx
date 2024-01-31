import { useEffect, useState } from "react";
import { useURLID } from "../../hooks/useURLID";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import title_img from "../../assets/image.png";
import "./Characters.css";

type EpisodeData = {
  id: number;
  name: string;
  characters: string[];
};

type CharacterData = {
  id: number;
  name: string;
  species: string;
};

const Characters = () => {
  const { id } = useURLID();

  const [episodeNum, setEpisodeNum] = useState<undefined | EpisodeData>();

  const [characters, setCharacters] = useState<undefined[] | CharacterData[]>(
    []
  );

  useEffect(() => {
    async function fetchEpisodeData() {
      try {
        const episode_res = await fetch(
          `https://rickandmortyapi.com/api/episode/${id}`
        ).then((episode_res) => episode_res.json());
        setEpisodeNum(episode_res);

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
    fetchEpisodeData();
  }, [id]);

  console.log(episodeNum);

  return (
    <section className="characters">
      <div className="characters-left">
        <div className="characters-button">
          <Button text="Episodes" />
        </div>
        <div className="characters-title">
          <span className="text text-400 characters-title-text-black">
            Characters of the <span className="text-700">4th</span>
            <br></br>
            episode of the <span className="text-700">4th</span>
          </span>
          <span className="text text-400 characters-title-text-black-last">
            season of the series
          </span>
          <span className="text characters-title-text-cyan text-700">
            Rick and Morty
          </span>
        </div>
        <figure className="characters-img">
          <img src={title_img} alt="Rick and Morty show image" />
        </figure>
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
