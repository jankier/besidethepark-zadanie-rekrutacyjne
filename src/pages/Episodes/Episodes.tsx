import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "../../GraphQL/Queries";
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
  const [episodesData, setEpisodesData] = useState<
    undefined[] | EpisodesData[]
  >([]);

  const episodeFilter = "S04";

  const { loading, error, data } = useQuery(GET_EPISODES, {
    variables: { episodeFilter },
  });

  useEffect(() => {
    if (error) {
      showBoundary(error);
    } else {
      if (data) {
        setEpisodesData(data.episodes.results);
      }
    }
  }, [data, error, showBoundary]);

  return (
    <section className="episodes">
      {loading ? (
        <div data-testid="loader-episodes-id" className="episodes-loading">
          <Loader />
        </div>
      ) : (
        <>
          <div className="episodes-left">
            <div className="episodes-title">
              <span className="text text-400 episodes-title-text-black">
                Episodes of the <span className="text-bold">4th </span>
                <br></br>
                season of the series
              </span>
              <span className="text-bold episodes-title-text-cyan text-400">
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
                  className="episodes-episode text-bold text-400"
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
