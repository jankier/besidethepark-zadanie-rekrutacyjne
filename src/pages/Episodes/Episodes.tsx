import "./Episodes.css";
import title_img from "../../assets/image.png";
import { useEffect, useState } from "react";

const Episodes = () => {
  interface SeriesData {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
  }

  const [seriesData, getSeriesData] = useState<undefined[] | SeriesData[]>([]);

  useEffect(() => {
    const authParameters = {
      method: "GET",
    };
    fetch(
      "https://rickandmortyapi.com/api/episode/?episode=S04",
      authParameters
    )
      .then((result) => result.json())
      .then((data) => getSeriesData(data.results));
  }, []);

  console.log(seriesData);

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
      <div className="episodes-right">
        {seriesData.map((episode, index) => {
          if (episode === undefined) {
            console.log(episode);
          }
          return (
            <div key={index} className="episodes-episode text text-700">
              <div className="episodes-no">{episode?.episode}</div>
              <div className="episodes-info">
                <div className="episodes-name">{episode?.name}</div>
                <div className="episodes-date">{episode?.air_date}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Episodes;
