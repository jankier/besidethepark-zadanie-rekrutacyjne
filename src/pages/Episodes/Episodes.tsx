import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import title_img from "../../assets/image.png";
import "./Episodes.css";

const Episodes = () => {
  type EpisodesData = {
    id: number;
    name: string;
    air_date: string;
    episode: string;
    characters: string[];
    url: string;
    created: string;
  };

  const [episodesData, getEpisodesData] = useState<
    undefined[] | EpisodesData[]
  >([]);

  useEffect(() => {
    async function fetchEpisodesData() {
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/episode/?episode=S04`
        );
        const data = await res.json();
        getEpisodesData(data.results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEpisodesData();
  }, []);

  return (
    <section className="episodes">
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
        <figure className="episodes-img">
          <img src={title_img} alt="Rick and Morty show image" />
        </figure>
      </div>
      <div className="episodes-right">
        {episodesData.map((episode) => {
          if (episode === undefined) {
            console.log(episode);
          }
          return (
            <Link
              key={episode?.id}
              className="episodes-episode text text-700"
              to={`/characters?id=${episode?.id}`}
            >
              <div className="episodes-no">{episode?.episode}</div>
              <div className="episodes-info">
                <div className="episodes-name">{episode?.name}</div>
                <div className="episodes-date">{episode?.air_date}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Episodes;
