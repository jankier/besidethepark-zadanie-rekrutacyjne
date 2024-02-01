import Button from "../../components/Button/Button";
import "./CharacterDetails.css";

const CharacterDetails = () => {
  return (
    <section className="character-details">
      <div className="character-details-left">
        <div className="character-details-button">
          <Button text="Characters" />
        </div>
        <div className="character-details-title">
          <span className="text text-700 character-details-title-text-cyan">
            Rick Sanchez
          </span>
        </div>
        <div className="character-details-img">
          <span className="text text-700">Character image</span>
        </div>
      </div>
    </section>
  );
};

export default CharacterDetails;
