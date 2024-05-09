import React, { useState } from "react";
import LoginPage from "./loginPage";
import TeamList from "./teamList";
import PokemonInfoPage from "./pokemonInfoPage";
import PokemonStats from "./pokemonStats";
import SignUp from "./signUp";
import Setting from "./setting.js";
import AboutUs from "./aboutUs.js";

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [history, setHistory] = useState(['login']); // This stack helps to keep track of navigation history
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  // Navigate to a new view
  const navigateTo = (view) => {
    if (currentView !== view) {
      setCurrentView(view);
      setHistory((prev) => [...prev, view]);
    }
  };
  // const navigateTo = (view) => {
  //   setCurrentView(view);
  //   setHistory((prev) => [...prev, view]); // Push new view onto history stack
  // };

  // Go back to the previous view
  const handleBack = () => {
    setHistory((prev) => {
      if (prev.length > 1) {
        const newHistory = prev.slice(0, -1);
        setCurrentView(newHistory[newHistory.length - 1]); // Set to previous view
        console.log(`Back to: ${newHistory[newHistory.length - 1]}`); // Logging for debug
        return newHistory;
      }
      return prev; // Stay on the current view if there's no previous history
    });
  };

  const handleSettings = () => {
    navigateTo('setting');
  };

  const handleLogin = () => {
    navigateTo('login');
  };
  const handlePokemonInfo = (id) => {
    setSelectedPokemonId(id);

    navigateTo('pokemoninfopage');
  };

  const handleOnAboutUs = () => {
    navigateTo("aboutus");
  };

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return (
          <LoginPage
            onLoginSuccess={() => navigateTo("pokemonstats")}
            onNavigateToSignUp={() => navigateTo("signup")}
            onAboutUs={handleOnAboutUs}
          />
        );
      case 'teamlist':
        return (
          <TeamList
            onBack={handleBack}
            onPokemonSelect={(id) => navigateTo(`pokemonstats/${id}`)}
            onSettings={handleSettings}
            onPokemonInfo={handlePokemonInfo} // Correctly pass the function reference
            onAboutUs={handleOnAboutUs}
          />
        );
      case 'pokemonstats':
        return (
          <PokemonStats
            onBack={handleBack}
            onAddPokemon={() => navigateTo('teamlist')}
            onSettings={handleSettings}
            onAboutUs={handleOnAboutUs}
          />
        );
      case 'setting':
        return <Setting onBack={handleBack} />;
      case 'signup':
        return <SignUp onBack={handleBack} onSubmit={handleLogin} />;
      case 'pokemoninfopage':
        return (
          <PokemonInfoPage
            onBack={handleBack}
            onSettings={handleSettings}
            onAboutUs={handleOnAboutUs}
          />
        );
      case "aboutus":
        return <AboutUs onBack={handleBack} />;
      default:
        return null; // Return null if currentView doesn't match any case
    }
  };

  return <div>{renderView()}</div>;
}

export default App;
