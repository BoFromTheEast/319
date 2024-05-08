import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This component will present a page where the page will read the pokemons
// and show the pokemon's data such as health and stat as well as a png
// from the mongodb as well as giving the user ability to add 4 pokemons to the team/bag
// once the pokemon is added the user can remove them by clicking on the remove button on the bar of the pokemon added

function TeamList() {
  const navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = 'pink'; // Set background when component mounts

    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));

    return () => {
      document.body.style.backgroundColor = ''; // Revert on unmount if necessary
    };
  }, []);

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

  const goBack = () => {
    navigate(-1); // Navigates back
  };

  const handlePokemonInfo = () => {
    navigate('/PokemonInfoPage');
  };

  const handlePokemonSelect = (name) => {
    setSearchTerm(name); // Set the search term to the selected Pokémon's name
    setFilteredPokemons([]); // Optionally clear the dropdown after selection
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <button
        onClick={goBack}
        className="self-start bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
      >
        Back
      </button>
      <div className="w-full md:w-1/2 lg:w-1/2 relative">
        <div className="bg-sky-400 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Pokemon"
            className="flex-1 text-black"
            style={{ padding: '8px', fontSize: '16px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg">
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
        </div>
      </div>
    </div>
  );
}

export default TeamList;
