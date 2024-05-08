import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This component will present a page where the page will read the pokemons
// and show the pokemon's data such as health and stat as well as a png
// from the mongodb as well as giving the user ability to add 4 pokemons to the team/bag
// once the pokemon is added the user can remove them by clicking on the remove button on the bar of the pokemon added

function TeamList() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundColor = "pink"; // Set background when component mounts

    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);

  const goBack = () => {
    navigate(-1); // Navigates back
  };

  const handlePokemonInfo = () => {
    navigate("/PokemonInfoPage");
  };

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
        <div className="bg-sky-400 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
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

      {/* Pokemon Image Placeholder */}
      <div className="w-full md:w-1/2 lg:w-1/5 mt-10">
        <div className="bg-white text-black font-bold p-10 rounded-lg shadow-lg text-center">
          Placeholder for Pokemon's image from MongoDB
        </div>
      </div>

      {/* Pokemon Bag */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-10 bg-sky-400 rounded-lg shadow-lg">
        <div className="p-5">
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <button onClick={handlePokemonInfo} className="flex-1 text-center">
              Pokemon 1
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
            <span className="flex-1 text-center">Pokemon 2</span>
            <button
              // onClick = ""
              className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
            >
              -
            </button>
          </div>
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <span className="flex-1 text-center">Pokemon 3</span>
            <button
              // onClick = ""
              className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
            >
              -
            </button>
          </div>
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <span className="flex-1 text-center">Pokemon 4</span>
            <button
              // onClick = ""
              className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
            >
              -
            </button>
          </div>
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <span className="flex-1 text-center">Pokemon 5</span>
            <button
              // onClick = ""
              className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
            >
              -
            </button>
          </div>
          <div className="mt-2 bg-green-500 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
            {/* <img src=""></img> */}
            <span className="flex-1 text-center">Pokemon 6</span>
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

export default TeamList;
