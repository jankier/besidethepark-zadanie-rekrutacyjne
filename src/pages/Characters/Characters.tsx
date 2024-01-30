import Button from "../../components/Button/Button";
import title_img from "../../assets/image.png";
import "./Characters.css";

const Characters = () => {
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
            episode of the <span className="text-700">1st</span>
            <br></br>
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
      <div className="characters-right"></div>
    </section>
  );
};

export default Characters;
