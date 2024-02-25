import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import title_img from "../../assets/image.png";
import Loader from "../../components/Loader/Loader";
import "./Episodes.css";

type EpisodesData = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

const Episodes = () => {
  const { showBoundary } = useErrorBoundary();
  const [isLoading, setIsLoading] = useState(true);
  const [episodesData, setEpisodesData] = useState<
    undefined[] | EpisodesData[]
  >([]);

  useEffect(() => {
    async function fetchEpisodesData() {
      try {
        await fetch(`https://rickandmortyapi.com/api/episode/?episode=S04`)
          .then((episodes_res) => episodes_res.json())
          .then((episodes_res) => {
            if (!episodes_res.error) {
              setEpisodesData(episodes_res.results);
              setIsLoading(!isLoading);
            } else {
              console.log(episodes_res.error);
              showBoundary(episodes_res.error);
            }
          });
      } catch (error) {
        showBoundary(error);
      }
    }
    fetchEpisodesData();
  }, []);

  return (
    <section className="episodes">
      {isLoading ? (
        <div className="episodes-loading">
          <Loader />
        </div>
      ) : (
        <>
          <div className="episodes-left">
            <div
              data-testid="test-title-episodes-id"
              className="episodes-title"
            >
              <span className="text text-400 episodes-title-text-black">
                Episodes of the <span className="text-700">4th </span>
                <br></br>
                season of the series
              </span>
              <span className="text episodes-title-text-cyan text-700">
                {" "}
                Rick and Morty
              </span>
            </div>
            <div className="episodes-img">
              <img src={title_img} alt="Rick and Morty show image" />
            </div>
          </div>
          <div className="episodes-right">
            {episodesData.map((episode) => {
              return (
                <Link
                  key={episode?.id}
                  className="episodes-episode text text-700"
                  to={`/characters/${episode?.id}`}
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
        </>
      )}
    </section>
  );
};

export default Episodes;
