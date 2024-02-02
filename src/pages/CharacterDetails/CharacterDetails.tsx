import { useEffect, useState } from "react";
import { useURLID } from "../../hooks/useURLID";
import { useNavigate, useLocation } from "react-router-dom";
import "./CharacterDetails.css";

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

const CharacterDetails = () => {
  const { id } = useURLID();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [characterData, setCharacterData] = useState<
    undefined | CharacterData
  >();

  useEffect(() => {
    async function fetchCharacterData() {
      try {
        const character_data_res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        ).then((character_data_res) => character_data_res.json());
        setCharacterData(character_data_res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCharacterData();
  }, [id]);

  const navigateToPrevious = () => {
    const { fromSpecificPage } = state || {};
    if (fromSpecificPage) {
      navigate(-1);
    } else {
      navigate("/episodes", { replace: true });
    }
  };

  return (
    <section className="character-details">
      <div className="character-details-left">
        <button
          className="back-button character-details-button"
          onClick={navigateToPrevious}
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
          <span className="text text-400">Characters</span>
        </button>
        <div className="character-details-title">
          <span className="text text-700 character-details-title-text-cyan">
            {characterData?.name}
          </span>
        </div>
        <div className="character-details-img">
          <img src={characterData?.image} alt="image of character" />
        </div>
      </div>
      <div className="character-details-right">
        <div className="text text-700 character-details-info">
          <div className="character-status">
            <span>{characterData?.status}</span>
            <span>Status</span>
          </div>
          <div className="character-species">
            <span>{characterData?.species}</span>
            <span>Species</span>
          </div>
          <div className="character-type">
            {characterData?.type === "" ? (
              <span>-</span>
            ) : (
              <span>{characterData?.type}</span>
            )}
            <span>Type</span>
          </div>
          <div className="character-gender">
            <span>{characterData?.gender}</span>
            <span>Gender</span>
          </div>
          <div className="character-origin">
            <span>{characterData?.origin.name}</span>
            <span>Origin</span>
          </div>
          <div className="character-location">
            <span>{characterData?.location.name}</span>
            <span>Last known location</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharacterDetails;
