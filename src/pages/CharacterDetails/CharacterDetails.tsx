import { useEffect, useState } from "react";
import { useURLID } from "../../hooks/useURLID";
import { useNavigate, useLocation } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { useQuery } from "@apollo/client";
import { GET_CHARACTER_DATA } from "../../GraphQL/Queries";
import Arrow from "../../components/Arrow/Arrow";
import Loader from "../../components/Loader/Loader";
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
  const { showBoundary } = useErrorBoundary();
  const [characterData, setCharacterData] = useState<
    undefined | CharacterData
  >();

  const { loading, error, data } = useQuery(GET_CHARACTER_DATA, {
    variables: { id },
  });

  useEffect(() => {
    if (error) {
      showBoundary(error);
    } else {
      if (data) {
        console.log(data);
        setCharacterData(data.character);
      }
    }
  }, [data, error, showBoundary]);

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
      {loading ? (
        <div
          data-testid="loader-character-details-id"
          className="character-details-loading"
        >
          <Loader />
        </div>
      ) : (
        <>
          <div className="character-details-left">
            <button
              className="back-button character-details-button"
              onClick={navigateToPrevious}
            >
              <Arrow />
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
        </>
      )}
    </section>
  );
};

export default CharacterDetails;
