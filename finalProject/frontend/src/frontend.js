import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./loginPage";
import TeamList from "./teamList";
import PokemonInfoPage from "./pokemonInfoPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/teamlist" element={<TeamList />} />
        <Route path="/" element={<TeamList />} />
        <Route path="/pokemoninfopage" element={<PokemonInfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
