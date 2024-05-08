import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./loginPage";
import TeamList from "./teamList";
import PokemonInfoPage from "./pokemonInfoPage";
import PokemonStats from "./pokemonStats";
import SignUp from "./signUp";
import Setting from "./setting.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/" element={<TeamList />} />
        <Route path="/" element={<PokemonStats />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/pokemonstats" element={<PokemonStats />} />
        <Route path="/teamlist" element={<TeamList />} />
        <Route path="/pokemoninfopage" element={<PokemonInfoPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </div>
  );
}

export default App;
