import { Route, Routes, Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Header from "./components/Header/Header";
import FetchingError from "./components/FetchingError/FetchingError";
import Episodes from "./pages/Episodes/Episodes";
import Characters from "./pages/Characters/Characters";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetails";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={FetchingError}>
        <Routes>
          <Route path="/" element={<Navigate to="/episodes" />} />
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/characters/:id" element={<Characters />} />
          <Route path="/character-details/:id" element={<CharacterDetails />} />
        </Routes>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

export default App;
