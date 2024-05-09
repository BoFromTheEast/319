import React, { useState } from "react";
import LoginPage from "./loginPage";
import TeamList from "./teamList";
import PokemonInfoPage from "./pokemonInfoPage";
import PokemonStats from "./pokemonStats";
import SignUp from "./signUp";
import Setting from "./setting.js";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [history, setHistory] = useState(["login"]); // This stack helps to keep track of navigation history
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  // Navigate to a new view
  const navigateTo = (view, id = null) => {
    setCurrentView(view);
    setHistory((prev) => [...prev, { view, id }]); // Push new view onto history stack
  };
  // const navigateTo = (view) => {
  //   setCurrentView(view);
  //   setHistory((prev) => [...prev, view]); // Push new view onto history stack
  // };

  // Go back to the previous view
  const handleBack = () => {
    setHistory((prev) => {
      if (prev.length === 1) return prev; // If it's the first view, do nothing

      const newHistory = prev.slice(0, -1); // Remove the last entry from the history
      const lastEntry = newHistory[newHistory.length - 1]; // Get the last entry from the new history

      setCurrentView(lastEntry.view); // Update the current view to the last entry's view
      if (lastEntry.id) setSelectedPokemonId(lastEntry.id); // If there's an ID, update it

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

  // const handlePokemonInfo = (id) => {
  //   navigateTo(`pokemoninfopage/${id}`);
  // };

  // const renderView = () => {
  //   switch (currentView) {
  //     case 'login':
  //       return (
  //         <LoginPage
  //           onLoginSuccess={() => navigateTo('pokemonstats')}
  //           onNavigateToSignUp={() => navigateTo('signup')}
  //         />
  //       );
  //     case 'teamlist':
  //       return (
  //         // <TeamList
  //         //   onBack={handleBack}
  //         //   onPokemonSelect={(id) => navigateTo(`pokemonstats/${id}`)}
  //         //   onSettings={handleSettings}
  //         //   onPokemonInfo={handlePokemonInfo} // Correctly pass the function reference
  //         // />
  //         <TeamList
  //           onBack={handleBack}
  //           onPokemonSelect={(id) => navigateTo(`pokemonstats/${id}`)}
  //           onSettings={handleSettings}
  //           onPokemonInfo={handlePokemonInfo} // Pass the function reference
  //         />
  //       );

  //     case 'pokemonstats':
  //       return (
  //         <PokemonStats
  //           onBack={handleBack}
  //           onAddPokemon={() => navigateTo('teamlist')}
  //           onSettings={handleSettings}
  //         />
  //       );
  //     case 'setting':
  //       return <Setting onBack={handleBack} />;
  //     case 'signup':
  //       return <SignUp onBack={handleBack} onSubmit={handleLogin} />;
  //     case 'pokemoninfopage':
  //       return (
  //         <PokemonInfoPage
  //           id={selectedPokemonId}
  //           onBack={handleBack}
  //           onSettings={handleSettings}
  //         />
  //       );
  //     default:
  //       const [route, id] = currentView.split('/');
  //       if (route === 'pokemoninfopage') {
  //         return (
  //           <PokemonInfoPage
  //             pokemonId={id}
  //             onSettings={handleSettings}
  //             onBack={handleBack}
  //           />
  //         );
  //       }
  //       return <LoginPage />;
  //   }
  // };
  const renderView = () => {
    switch (currentView) {
      case "login":
        return (
          <LoginPage
            onLoginSuccess={() => navigateTo("pokemonstats")}
            onNavigateToSignUp={() => navigateTo("signup")}
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
      case "pokemoninfopage":
        return (
          <PokemonInfoPage
            onBack={handleBack}
            id={selectedPokemonId} // Assuming `selectedPokemonId` is defined elsewhere
            onSettings={handleSettings}
          />
        );
      default:
        return null; // Return null if currentView doesn't match any case
    }
  };

  return <div>{renderView()}</div>;
}

export default App;
