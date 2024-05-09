import React, { useState } from "react";
import LoginPage from "./loginPage";
import TeamList from "./teamList";
import PokemonInfoPage from "./pokemonInfoPage";
import PokemonStats from "./pokemonStats";
import SignUp from "./signUp";
import Setting from "./setting.js";
import AboutUs from "./aboutUs.js";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [history, setHistory] = useState([{ view: "login", id: null }]); // This stack helps to keep track of navigation history
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  // Navigate to a new view
  const navigateTo = (view, id = null, updateHistory = true) => {
    if (view !== currentView || id !== selectedPokemonId) {
      setCurrentView(view);
      if (updateHistory) {
        setHistory((prev) => [...prev, { view, id }]);
      }
    }
  };

  // Go back to the previous view
  const handleBack = () => {
    setHistory((prev) => {
      if (prev.length === 1) return prev; // If it's the first view, do nothing

      const newHistory = prev.slice(0, -1); // Remove the last entry from the history
      const lastEntry = newHistory[newHistory.length - 1]; // Get the last entry from the new history

      setCurrentView(lastEntry.view); // Update the current view to the last entry's view
      setSelectedPokemonId(lastEntry.id || null); // Ensure selectedPokemonId is updated or cleared

      return newHistory;
    });
  };

  const handleSettings = () => {
    navigateTo("setting");
  };

  const handleLogin = () => {
    navigateTo("login");
  };
  const handlePokemonInfo = (id) => {
    setSelectedPokemonId(id);

    navigateTo("pokemoninfopage");
  };

  const renderView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginPage
            onLoginSuccess={() => navigateTo("pokemonstats")}
            onNavigateToSignUp={() => navigateTo("signup")}
            onAboutUs={() => navigateTo("aboutus")}
          />
        );
      case "teamlist":
        return (
          <TeamList
            onBack={handleBack}
            onPokemonSelect={(id) => navigateTo(`pokemonstats/${id}`)}
            onSettings={handleSettings}
            onPokemonInfo={handlePokemonInfo} // Pass the function reference
          />
        );
      case "pokemonstats":
        return (
          <PokemonStats
            onBack={handleBack}
            onAddPokemon={() => navigateTo("teamlist")}
            onSettings={handleSettings}
          />
        );
      case "setting":
        return <Setting onBack={handleBack} />;
      case "signup":
        return <SignUp onBack={handleBack} onSubmit={handleLogin} />;
      case "aboutus":
        return <AboutUs onBack={handleBack} />;
      case "pokemoninfopage":
        return (
          <PokemonInfoPage
            onBack={handleBack}
            id={selectedPokemonId} // Assuming `selectedPokemonId` is defined elsewhere
            // onSettings={handleSettings}
          />
        );
      default:
        return null; // Return null if currentView doesn't match any case
    }
  };

  return <div>{renderView()}</div>;
}

export default App;
