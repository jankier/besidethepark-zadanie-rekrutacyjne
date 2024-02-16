import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import Episodes from "./pages/Episodes/Episodes";
import Characters from "./pages/Characters/Characters";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetails";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/episodes" />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/characters/:id" element={<Characters />} />
        <Route path="/character-details/:id" element={<CharacterDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
