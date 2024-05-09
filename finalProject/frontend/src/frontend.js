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
  const [history, setHistory] = useState(["login"]); // This stack helps to keep track of navigation history

  // Navigate to a new view
  const navigateTo = (view) => {
    if (currentView !== view) {
      setCurrentView(view);
      setHistory((prev) => [...prev, view]);
    }
  };

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
    navigateTo("setting");
  };

  const handleLogin = () => {
    navigateTo("login");
  };

  const handlePokemonInfo = (id) => {
    navigateTo(`pokemoninfopage/${id}`);
  };

  const handleOnAboutUs = () => {
    navigateTo("aboutus");
  };

  const renderView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginPage
            onLoginSuccess={() => navigateTo("pokemonstats")}
            onNavigateToSignUp={() => navigateTo("signup")}
            onAboutUs={handleOnAboutUs}
          />
        );
      case "teamlist":
        return (
          <TeamList
            onBack={handleBack}
            onPokemonSelect={(id) => navigateTo(`pokemonstats/${id}`)}
            onSettings={handleSettings}
            onPokemonInfo={handlePokemonInfo} // Correctly pass the function reference
            onAboutUs={handleOnAboutUs}
          />
        );

      case "pokemonstats":
        return (
          <PokemonStats
            onBack={handleBack}
            onAddPokemon={() => navigateTo("teamlist")}
            onSettings={handleSettings}
            onAboutUs={handleOnAboutUs}
          />
        );
      case "setting":
        return <Setting onBack={handleBack} />;
      case "signup":
        return <SignUp onBack={handleBack} onSubmit={handleLogin} />;
      case "pokemoninfopage":
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
        const [route, id] = currentView.split("/");
        if (route === "pokemoninfopage") {
          return (
            <PokemonInfoPage
              pokemonId={id}
              onSettings={handleSettings}
              onBack={handleBack}
            />
          );
        }
        return <LoginPage />;
    }
  };

  return <div>{renderView()}</div>;
}

export default App;
