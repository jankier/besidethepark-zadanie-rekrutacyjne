import { FallbackProps } from "react-error-boundary";
import "./FetchingError.css";

const FetchingError = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;
  console.log(error);
  return (
    <section className="error-page">
      <div className="error-text">
        <span className="text text-700">Something went wrong...</span>
        {error.message ? (
          <span className="text text-700">{error.message}</span>
        ) : (
          <span className="text text-700">{error}</span>
        )}
      </div>
      <button
        className="refresh-button text text-700"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </section>
  );
};

export default FetchingError;
