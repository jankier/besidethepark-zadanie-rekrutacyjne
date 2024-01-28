import { Route, Routes, Navigate } from "react-router-dom";
import Episodes from "./pages/Episodes/Episodes";
import Characters from "./pages/Characters/Characters";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetails";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/episodes" />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character-detials" element={<CharacterDetails />} />
      </Routes>
    </>
  );
}

export default App;
