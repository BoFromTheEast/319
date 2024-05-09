import React, { useState, useEffect } from "react";
// left and right button
import LeftButton from "./leftButton.png";
import RightButton from "./rightButton.png";
import setting from "./setting.png";
// import pokemonGif from "./pokemon-gif.gif";
import trainerGif from "./trainer.gif";
import battleGif from "./hot.gif";
import axios from "axios"; // Make sure to import axios here

function PokemonStats(props) {
  const [playGif, setPlayGif] = useState(false);
  const [pokemonTeam, setPokemonTeam] = useState([]);

  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

  useEffect(() => {
    setPlayGif(true);
    // Set a timeout to hide the GIF and show the main content after 3 seconds
    const timer = setTimeout(() => {
      setPlayGif(false);
    }, 1000); // Adjust this duration to match the length of your GIF

    document.body.style.backgroundColor = "grey"; // Set background color when component mounts

    return () => {
      clearTimeout(timer); // Clear the timeout when the component unmounts
      document.body.style.backgroundColor = ""; // Revert the background color
    };
  }, []);

  useEffect(() => {
    async function fetchPokemon() {
      const token = localStorage.getItem("userToken");
      const loginName = localStorage.getItem("loginName");
      if (!token || !loginName) {
        alert("Please log in again.");
        return props.onFail();
      }

      try {
        const response = await axios.get(
          `http://localhost:8081/user/${loginName}/pokemon`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPokemonTeam(response.data.pokemonTeam);
      } catch (error) {
        console.error("Failed to fetch Pokémon:", error);
      }
    }

    fetchPokemon();
  }, []);

  const handleNavigatePokemon = (direction) => {
    setCurrentPokemonIndex((prev) =>
      direction === "left"
        ? prev > 0
          ? prev - 1
          : pokemonTeam.length - 1
        : (prev + 1) % pokemonTeam.length
    );
  };

  const currentPokemon = pokemonTeam[currentPokemonIndex];

  const goBack = () => {
    props.onBack();
  };
  const handleAddPokemon = () => {
    props.onAddPokemon();
  };
  const handleSetting = () => {
    props.onSettings();
  };

  function StatsDisplay({ stats }) {
    return (
      <div className="text-lg">
        {" "}
        {/* Larger text for the entire container */}
        <h1 className="text-2xl font-bold text-black-500 uppercase tracking-wide mb-2">
          Stats
        </h1>
        {/* Larger and bold title */}
        <ul>
          <li className="text-black">Health: {stats.health}</li>
          <li className="text-black">Attack: {stats.attack}</li>
          <li className="text-black">Defense: {stats.defense}</li>
          <li className="text-black">Special Attack: {stats.specialAttack}</li>
          <li className="text-black">
            Special Defense: {stats.specialDefense}
          </li>
          <li className="text-black">Speed: {stats.speed}</li>
        </ul>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {playGif ? (
        <img
          src={battleGif}
          alt="Loading Battle..."
          className="flex flex-col items-center justify-center h-50 w-50"
        />
      ) : (
        <>
          <div className="flex justify-between w-full px-4">
            <button
              onClick={goBack}
              className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
            >
              Back
            </button>
            <button
              onClick={handleAddPokemon}
              className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
            >
              Add Pokemon
            </button>
          </div>
          {currentPokemon ? (
            <div className="w-full md:w-1/2 lg:w-1/2 mt-3 bg-orange-400 rounded-lg shadow-lg p-10 text-center">
              <div className="bg-white text-black font-bold p-10 rounded-lg shadow-lg">
                <p className="text-2xl font-bold text-black-500 uppercase tracking-wide">
                  {currentPokemon.name}
                </p>
                <div className="bg-white text-black font-bold p-10 rounded-lg shadow-lg mt-3 flex justify-center">
                  <img
                    src={currentPokemon?.dreamWorldImageUrl}
                    alt={`Image of ${currentPokemon.name}`}
                    className="h-48 w-48"
                  />
                </div>
              </div>
              <div className="flex justify-between w-full px-4 mt-4">
                <button
                  onClick={() => handleNavigatePokemon("left")}
                  className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
                >
                  <img src={LeftButton} alt="Left" className="h-8 w-8" />
                </button>
                <button
                  onClick={() => handleNavigatePokemon("right")}
                  className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
                >
                  <img src={RightButton} alt="Right" className="h-8 w-8" />
                </button>
              </div>
            </div>
          ) : (
            <p className="text-2xl font-bold text-black-500 uppercase tracking-wide mb-2 mt-2 bg-black text-white font-bold p-2 rounded-lg shadow-lg flex justify-between items-center">
              No Pokémon available.
            </p>
          )}
          <div className="w-full md:w-1/2 lg:w-1/2 mt-3 bg-orange-400 rounded-lg shadow-lg">
            <div className="p-5">
              <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-center items-center">
                {currentPokemon ? (
                  <StatsDisplay stats={currentPokemon.stats} />
                ) : (
                  <p>No Pokémon!</p>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-4 mt-10 flex justify-center items-center">
            <button
              onClick={handleSetting}
              className="bg-gray-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
            >
              <img src={setting} alt="setting" className="h-8 w-8" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonStats;
