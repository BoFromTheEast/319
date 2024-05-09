import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// left and right button
import LeftButton from "./leftButton.png";
import RightButton from "./rightButton.png";
import setting from "./setting.png";
import axios from "axios"; // Make sure to import axios here

function PokemonStats() {
  const navigate = useNavigate();
  const [pokemonTeam, setPokemonTeam] = useState([]);
  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

  useEffect(() => {
    document.body.style.backgroundColor = "grey"; // Set background when component mounts

    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);

  useEffect(() => {
    async function fetchPokemon() {
      const token = localStorage.getItem("userToken");
      const loginName = localStorage.getItem("loginName");
      if (!token || !loginName) {
        alert("Please log in again.");
        return navigate("/login");
      }

      try {
        const response = await axios.get(
          // `http://localhost:8081/user/${loginName}/pokemon`,
          `http://localhost:8081/user/test@iastate.edu/pokemon`,
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
  }, [navigate]);

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

  function StatsDisplay({ stats }) {
    return (
      <div className="text-lg">
        {" "}
        {/* Larger text for the entire container */}
        <h1 className="text-xl font-bold mb-2">Stats</h1>{" "}
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

  const goBack = () => {
    navigate(-1); // Navigates back
  };

  const handleAddPokemon = () => {
    navigate("/TeamList");
  };
  const handleSetting = () => {
    navigate("/Setting");
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* Buttons */}
      <div className="flex justify-between w-full px-4">
        {/* Back button aligned with content width */}
        <button
          onClick={goBack}
          className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
        >
          Back
        </button>
        {/* Button to go to the bag */}
        <button
          onClick={handleAddPokemon}
          className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
        >
          Add Pokemon
        </button>
      </div>
      {currentPokemon ? (
        <div className="w-full md:w-1/2 lg:w-1/2 mt-3 bg-orange-400 rounded-lg shadow-lg p-10 text-center">
          {/* Pokemon Image and stats Placeholder */}
          <div className="bg-white text-black font-bold p-10 rounded-lg shadow-lg">
            {currentPokemon.name}
            <div className="bg-white text-black font-bold p-10 rounded-lg shadow-lg mt-3 flex justify-center">
              <img
                src={currentPokemon?.dreamWorldImageUrl}
                alt={
                  currentPokemon
                    ? `Image of ${currentPokemon.name}`
                    : "Loading Pokémon image"
                }
                className="h-48 w-48" // Tailwind utility classes for width and height
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
        <p>No Pokémon available.</p>
      )}
      {/* Pokemon Stats */}
      {/* And use it in your main component like this: */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-3 bg-orange-400 rounded-lg shadow-lg">
        <div className="p-5">
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            <div className="flex-1 text-center">
              {currentPokemon ? (
                <StatsDisplay stats={currentPokemon.stats} />
              ) : (
                <p>Loading stats...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Setting */}
      <div className="space-y-4 mt-10 flex justify-center items-center">
        <button
          onClick={handleSetting}
          className="bg-gray-400 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
        >
          <img src={setting} alt="setting" className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

export default PokemonStats;
