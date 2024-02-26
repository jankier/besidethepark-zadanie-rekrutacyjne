import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { useQuery, gql } from "@apollo/client";
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

  const GET_EPISODES = gql`
    query EpisodesData {
      episodes(filter: { episode: "S04" }) {
        results {
          id
          name
          air_date
          episode
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_EPISODES);

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
