import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import setting from './setting.png';

function PokemonInfoPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [moves, setMoves] = useState([]);

  //fetch first 150 pokemon to show as possible suggestions in search
  //fetch moves for the specific Pokémon
  useEffect(() => {
    const userEmail = localStorage.getItem('loginName');
    fetch(`http://localhost:8081/user/${userEmail}/pokemon/${id}/moves`)
      .then((response) => response.json())
      .then((data) => {
        setMoves(data);
        console.log(data); // Log the updated moves
      })
      .catch((error) => console.error('Error fetching moves:', error));
  }, [id]); // Include id and moves in the dependency array

  useEffect(() => {
    document.body.style.backgroundColor = 'orange'; // Set background when component mounts

    return () => {
      document.body.style.backgroundColor = ''; // Revert on unmount if necessary
    };
  }, []);

  const goBack = () => {
    navigate(-1); // Navigates back
  };
  const handleSetting = () => {
    navigate('/Setting');
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

      {/* Pokemon Image and stats Placeholder */}
      <div className="w-full md:w-1/2 lg:w-1/5 mt-5">
        <div className="bg-white text-black font-bold p-10 rounded-lg shadow-lg text-center">
          Placeholder for Pokemon's image from MongoDB
        </div>
      </div>
      {/* Search Bar */}
      <div className="w-full md:w-1/2 lg:w-1/2 relative">
        <div className="bg-sky-400 text-white font-bold p-10 rounded-lg shadow-lg flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Pokemon"
            className="flex-1 text-black"
            style={{ padding: '8px', fontSize: '16px' }}
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            // onClick={() => handleAddPokemon(searchTerm)}
            className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
          >
            +
          </button>
        </div>
      </div>
      {/* Pokemon Moves */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-3 bg-orange-400 rounded-lg shadow-lg">
        <div className="p-5">
          <h2 className="text-white font-bold text-center mb-3">Moves</h2>
          <ul className="space-y-2">
            {moves.map((move, index) => (
              <li
                key={index}
                className="bg-green-500 text-white font-bold p-2 rounded-lg shadow-lg flex justify-between items-center"
              >
                {move}
              </li>
            ))}
          </ul>
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
    </div>
  );
}

export default PokemonInfoPage;
