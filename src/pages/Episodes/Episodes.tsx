import "./Episodes.css";
import title_img from "../../assets/image.png";

const Episodes = () => {
  return (
    <div className="episodes">
      <div className="episodes-left">
        <div className="episodes-title">
          <span className="text text-400 episodes-title-text-black">
            Episodes of the <span className="text-700">4th</span>
            <br></br>
            season of the series
          </span>
          <span className="text episodes-title-text-cyan text-700">
            Rick and Morty
          </span>
        </div>
        <div className="episodes-img">
          <img src={title_img} alt="Rick and Morty show image" />
        </div>
      </div>
      <div className="episodes-right"></div>
    </div>
  );
};

export default Episodes;
