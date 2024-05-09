import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import setting from "./setting.png";

function TeamList() {
  const navigate = useNavigate();
  //pokemon bag
  const [pokemonData, setPokemonData] = useState([]);
  //possible pokemons that can be searched
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  //fetch first 150 pokemon to show as possible suggestions in search
  useEffect(() => {
    document.body.style.backgroundColor = 'pink'; // Set background when component mounts
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((response) => response.json())
      .then((data) => {
        setPokemons(data.results);
        console.log(data.results); // Log the results after setting the moves state
      });
    return () => {
      document.body.style.backgroundColor = ""; // Revert on unmount if necessary
    };
  }, []);

  //set
  useEffect(() => {
    if (searchTerm) {
      setFilteredPokemons(
        pokemons.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPokemons([]); // Clear filteredPokemons when search term is cleared
    }
  }, [searchTerm, pokemons]);
  //fetch all pokemon for user (used when page starts up)
  useEffect(() => {
    const userEmail = localStorage.getItem('loginName');
    fetch(`http://localhost:8081/user/${userEmail}/pokemon/names`)
      .then((response) => response.json())
      .then((data) => setPokemonData(data))
      .catch((error) => console.error('Error fetching pokemons:', error));
  }, []);
  //fetch all pokemon for user (used after pokemon is added)
  const fetchPokemonNames = () => {
    const userEmail = localStorage.getItem('loginName');
    fetch(`http://localhost:8081/user/${userEmail}/pokemon/names`)
      .then((response) => response.json())
      .then((data) => setPokemonData(data))
      .catch((error) => console.error('Error fetching pokemons:', error));
  };

  //handle when a pokemon name is selected in suggestions
  const handlePokemonSelect = (name) => {
    setSearchTerm(name); // Set the search term to the selected Pokémon's name
    setFilteredPokemons(
      filteredPokemons.filter((pokemon) => pokemon.name !== name)
    );
  };
  //go to settings page
  const handleSetting = () => {
    navigate("/Setting");
  };
  //go page tracking pokemon id
  const handlePokemonInfo = (id) => {
    navigate(`/PokemonInfoPage/${id}`);
  };
  //go prev page
  const goBack = () => {
    navigate(-1); // Navigates back
  };
  //delete pokemon if remove button is pressed
  const handleDeletePokemon = async (id) => {
    const userEmail = localStorage.getItem('loginName');
    try {
      const response = await fetch(
        `http://localhost:8081/user/${userEmail}/pokemon/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete Pokémon");
      }

      // Remove the deleted Pokémon from the state
      setPokemonData(pokemonData.filter((pokemon) => pokemon.id !== id));
    } catch (error) {
      console.error("Error deleting Pokémon:", error);
    }
  };

  //handle adding pokemon from search
  const handleAddPokemon = async (name) => {
    const userEmail = localStorage.getItem('loginName');
    try {
      const response = await fetch(
        `http://localhost:8081/user/${userEmail}/pokemon`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }), // Send the Pokémon name in the request body
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add Pokémon');
      }
      // Reload the list of Pokémon names after adding a new Pokémon
      fetchPokemonNames();
    } catch (error) {
      console.error('Error adding Pokémon:', error);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <button
        onClick={goBack}
        className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
      >
        Back
      </button>
      {/* Search Bar */}
      <div className="w-full md:w-1/2 lg:w-1/2 relative">
        <div className="bg-sky-400 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Pokemon"
            className="flex-1 text-black rounded-lg"
            style={{ padding: "8px", fontSize: "16px" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => handleAddPokemon(searchTerm)}
            className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
          >
            +
          </button>
        </div>
        {searchTerm && (
          <div className="absolute bg-sky-400 text-white w-full rounded-lg shadow-lg mt-1 overflow-y-auto max-h-60">
            {filteredPokemons.map((pokemon) => (
              <div
                key={pokemon.name}
                className="text-center p-2 hover:bg-sky-500 cursor-pointer"
                onClick={() => handlePokemonSelect(pokemon.name)}
              >
                {pokemon.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pokemon Image Placeholder */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-10 bg-sky-400 rounded-lg shadow-lg">
        <div className="p-5">
          {pokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              className="mt-2 bg-green-500 text-white font-bold p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              {/* Button to the left */}
              <button
                onClick={() => handlePokemonInfo(pokemon.id)}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
              >
                Moves
              </button>
              {/* name of pokemon */}
              <span className="flex-1 text-center">{pokemon.name}</span>
              {/* Button to the right */}
              <button
                onClick={() => handleDeletePokemon(pokemon.id)}
                className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Setting B*/}
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

export default TeamList;
