import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// left and right button
import LeftButton from "./leftButton.png";
import RightButton from "./rightButton.png";

function PokemonStats() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "grey"; // Set background when component mounts

    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);

  const goBack = () => {
    navigate(-1); // Navigates back
  };

  const handleAddPokemon = () => {
    navigate("/TeamList");
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
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

      <div className="w-full md:w-1/2 lg:w-1/2 mt-3 bg-orange-400 rounded-lg shadow-lg p-10 text-center">
        {/* Pokemon Image and stats Placeholder */}
        <div className="bg-white text-black font-bold p-10 rounded-lg shadow-lg">
          Placeholder for Pokemon's image from MongoDB
        </div>
        {/* Buttons */}
        <div className="flex justify-between w-full px-4 mt-4">
          {/* Button to another pokemon, left button*/}
          <button
            // onClick={() => handleNavigatePokemon("left")}
            className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
          >
            <img src={LeftButton} alt="Left" className="h-8 w-8" />
          </button>
          <button
            // onClick={() => handleNavigatePokemon("right")}
            className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
          >
            <img src={RightButton} alt="Right" className="h-8 w-8" />
          </button>
        </div>
      </div>

      {/* Pokemon Moves */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-3 bg-orange-400 rounded-lg shadow-lg">
        <div className="p-5">
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <div className="flex-1 text-center">Stats</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonStats;
