import { useEffect, useState } from "react";
import { useURLID } from "../../hooks/useURLID";
import { Link, useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { useQuery, gql } from "@apollo/client";
import title_img from "../../assets/image.png";
import Arrow from "../../components/Arrow/Arrow";
import Loader from "../../components/Loader/Loader";
import "./Characters.css";

type CharacterData = {
  id: number;
  name: string;
  species: string;
};

const Characters = () => {
  const navigate = useNavigate();
  const { id } = useURLID();
  const { showBoundary } = useErrorBoundary();
  const [episodeNum, setEpisodeNum] = useState<undefined | string>();
  const [characters, setCharacters] = useState<undefined[] | CharacterData[]>(
    []
  );

  const GET_CHARACTERS = gql`
  query CharactersData {
    episode(id: ${id}) {
      episode
      characters {
        id
        name
        species
      }
    }
  }
`;

  const { loading, error, data } = useQuery(GET_CHARACTERS);

  useEffect(() => {
    if (error) {
      showBoundary(error);
    } else {
      if (data) {
        setEpisodeNum(data.episode.episode.split("E").pop());
        setCharacters(data.episode.characters);
      }
    }
  }, [data, error, showBoundary]);

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
      {loading ? (
        <div className="characters-loading">
          <Loader />
        </div>
      ) : (
        <>
          <div className="characters-left">
            <button
              className="back-button characters-button"
              onClick={() => navigate("/episodes")}
            >
              <Arrow />
              <span className="text text-400">Episodes</span>
            </button>
            <div
              data-testid="test-title-characters-id"
              className="characters-title"
            >
              <span className="text text-400 characters-title-text-black">
                Characters of the{" "}
                <span className="text-700">{episode_num}</span>
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
                  to={`/character-details/${character?.id}`}
                >
                  <div className="characters-info">
                    <div className="characters-name">{character?.name}</div>
                    <div className="characters-species">
                      {character?.species}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default Characters;
