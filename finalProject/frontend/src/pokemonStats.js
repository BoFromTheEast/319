import React, { useState, useEffect } from 'react';
// left and right button
import LeftButton from './leftButton.png';
import RightButton from './rightButton.png';
import setting from './setting.png';
import battleGif from './hot.gif';
import boxBack from './box.gif';
import axios from 'axios';

function PokemonStats(props) {
  //states
  const [playGif, setPlayGif] = useState(false);
  const [pokemonTeam, setPokemonTeam] = useState([]);

  const [currentPokemonIndex, setCurrentPokemonIndex] = useState(0);

  useEffect(() => {
    setPlayGif(true);
    // Set a timeout to hide the GIF and show the main content after 3 seconds
    const timer = setTimeout(() => {
      setPlayGif(false);
    }, 2000);

    document.body.style.backgroundColor = 'grey'; // Set background color when component mounts

    return () => {
      clearTimeout(timer); // Clear the timeout when the component unmounts
      document.body.style.backgroundColor = '';
    };
  }, []);
  //fetch all pokemon in team
  useEffect(() => {
    async function fetchPokemon() {
      const token = localStorage.getItem('userToken');
      const loginName = localStorage.getItem('loginName');
      if (!token || !loginName) {
        alert('Please log in again.');
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
        console.error('Failed to fetch Pokémon:', error);
      }
    }

    fetchPokemon();
  }, []);
  //handle going back and forth between pokemon
  const handleNavigatePokemon = (direction) => {
    setCurrentPokemonIndex((prev) =>
      direction === 'left'
        ? prev > 0
          ? prev - 1
          : pokemonTeam.length - 1
        : (prev + 1) % pokemonTeam.length
    );
  };

  const currentPokemon = pokemonTeam[currentPokemonIndex];

  //navigation
  const goBack = () => {
    props.onBack();
  };
  const handleAddPokemon = () => {
    props.onAddPokemon();
  };
  const handleSetting = () => {
    props.onSettings();
  };

  //stats Display Component
  function StatsDisplay({ stats }) {
    return (
      <div className="text-lg">
        {' '}
        <h1 className="text-2xl font-bold text-black-500 uppercase tracking-wide mb-2">
          Stats
        </h1>
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
          style={{ height: '800px', width: '800px' }}
          className="flex flex-col items-center justify-center mt-10"
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
                  onClick={() => handleNavigatePokemon('left')}
                  className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg mb-4"
                >
                  <img src={LeftButton} alt="Left" className="h-8 w-8" />
                </button>
                <button
                  onClick={() => handleNavigatePokemon('right')}
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
              <div
                className="flex justify-center"
                style={{ backgroundImage: `url(${boxBack})` }}
              >
                <div className="bg-white p-5 rounded-lg shadow-lg max-w-xs w-full mx-5 my-5 text-center">
                  {currentPokemon ? (
                    <StatsDisplay stats={currentPokemon.stats} />
                  ) : (
                    <p>No Pokémon!</p>
                  )}
                </div>
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
