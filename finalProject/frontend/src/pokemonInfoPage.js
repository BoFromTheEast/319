import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PokemonInfoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "orange"; // Set background when component mounts

    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);

  const goBack = () => {
    navigate(-1); // Navigates back
  };

  //   const handlePokemonInfo = () => {
  //     navigate("/PokemonInfoPage");
  //   };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* Back button aligned with content width */}
      <button
        onClick={goBack}
        className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
      >
        Back
      </button>

      {/* Pokemon Title */}
      <div className="w-full md:w-1/2 lg:w-1/2">
        <div className="bg-red-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
          <span className="flex-1 text-center">
            Place holder for Pokemon title
          </span>
          <button
            // onClick = ""
            className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Pokemon Image and stats Placeholder */}
      <div className="w-full md:w-1/2 lg:w-1/5 mt-5">
        <div className="bg-white text-black font-bold p-10 rounded-lg shadow-lg text-center">
          Placeholder for Pokemon's image from MongoDB
          <div className="mt-3 focus:outline-black">
            placeholder for pokemon's stats
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg shadow-lg">
        <input></input>
      </div>

      {/* Pokemon Moves */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-3 bg-orange-400 rounded-lg shadow-lg">
        <div className="p-5">
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <button
              // onClick={handlePokemonInfo}
              className="flex-1 text-center"
            >
              Pokemon move 1
            </button>
            <button
              // onClick = ""
              className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
            >
              -
            </button>
          </div>

          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <span className="flex-1 text-center">Pokemon move 2</span>
            <button
              // onClick = ""
              className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
            >
              -
            </button>
          </div>
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <span className="flex-1 text-center">Pokemon move 3</span>
            <button
              // onClick = ""
              className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
            >
              -
            </button>
          </div>
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <span className="flex-1 text-center">Pokemon move 4</span>
            <button
              // onClick = ""
              className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonInfoPage;
