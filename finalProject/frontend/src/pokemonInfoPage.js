import React, { useState, useEffect } from 'react';

function PokemonInfoPage(props) {
  //get pokemon id from view before
  const { id } = props;
  //states
  const [pokemonMoves, setPokemonMoves] = useState([]);
  const [moves, setMoves] = useState([]);
  const [moveSearchTerm, setMoveSearchTerm] = useState('');
  const [filteredMoves, setFilteredMoves] = useState([]);

  //fetch all moves that a pokemon can learn and set background
  useEffect(() => {
    document.body.style.backgroundColor = 'orange';
    const userEmail = localStorage.getItem('loginName');
    fetch(`http://localhost:8081/user/${userEmail}/pokemon/${id}/moves`)
      .then((response) => response.json())
      .then((data) => {
        setMoves(data);
      })
      .catch((error) => console.error('Error fetching moves:', error));
  }, [id]);
  //filter moves as user types
  useEffect(() => {
    const filtered = moves.filter((move) =>
      move.toLowerCase().startsWith(moveSearchTerm.toLowerCase())
    );
    setFilteredMoves(filtered);
  }, [moveSearchTerm, moves]);
  //fetch moves that current pokemon knows
  useEffect(() => {
    const userEmail = localStorage.getItem('loginName');
    fetch(`http://localhost:8081/user/${userEmail}/pokemon/${id}/movess`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch moves');
        }
        return response.json();
      })
      .then((data) => {
        setPokemonMoves(data);
      })
      .catch((error) => {
        console.error('Error fetching moves:', error);
      });
  }, [id]);

  //function for fetchMoves
  const fetchMoves = () => {
    const userEmail = localStorage.getItem('loginName');
    fetch(`http://localhost:8081/user/${userEmail}/pokemon/${id}/movess`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch moves');
        }
        return response.json();
      })
      .then((data) => {
        setPokemonMoves(data);
      })
      .catch((error) => {
        console.error('Error fetching moves:', error);
      });
  };
  // Navigates back
  const goBack = () => {
    props.onBack();
  };
  // Handle adding a move
  const handleAddMove = async (moveName) => {
    const userEmail = localStorage.getItem('loginName');
    const pokemonId = id;

    try {
      const response = await fetch(
        `http://localhost:8081/user/${userEmail}/pokemon/${pokemonId}/move`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: moveName }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add move');
      }
      // Reload the list of moves after adding a new move
      fetchMoves();
    } catch (error) {
      console.error('Error adding move:', error);
    }
  };
  //handle delete move
  const handleDeleteMove = async (moveId) => {
    const userEmail = localStorage.getItem('loginName');
    const pokemonId = id;
    try {
      const response = await fetch(
        `http://localhost:8081/user/${userEmail}/pokemon/${pokemonId}/move/${moveId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete move');
      }

      // Refresh the moves list after deleting a move
      fetchMoves();
    } catch (error) {
      console.error('Error deleting move:', error);
    }
  };

  // Handle selecting a move from suggestions
  const handleMoveSelect = (moveName) => {
    setMoveSearchTerm(moveName); // Set the move search term to the selected move name
    setFilteredMoves(filteredMoves.filter((move) => move !== moveName));
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      {/* Back button  */}
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
            placeholder="Search Move"
            className="flex-1 text-black rounded-lg"
            style={{ padding: '8px', fontSize: '16px' }}
            value={moveSearchTerm}
            onChange={(e) => setMoveSearchTerm(e.target.value)}
          />
          <button
            onClick={() => handleAddMove(moveSearchTerm)}
            className="bg-orange-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
          >
            +
          </button>
        </div>
        {/* Handles suggestions */}
        {moveSearchTerm && (
          <div className="absolute bg-sky-400 text-white w-full rounded-lg shadow-lg mt-1 overflow-y-auto max-h-60">
            {filteredMoves.map((move) => (
              <div
                key={move}
                className="text-center p-2 hover:bg-sky-500 cursor-pointer"
                onClick={() => handleMoveSelect(move)}
              >
                {move}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Pokemon Moves */}
      <div className="w-full md:w-1/2 lg:w-1/2 mt-10 bg-sky-400 rounded-lg shadow-lg">
        <div className="p-5">
          {pokemonMoves.map((move) => (
            <div
              key={move._id}
              className="mt-2 bg-green-500 text-white font-bold p-4 rounded-lg shadow-lg flex justify-between items-center"
            >
              {/* name of pokemon */}
              <span className="flex-1 text-center">{move.name}</span>
              {/* Button to the right to remove */}
              <button
                onClick={() => handleDeleteMove(move._id)}
                className="bg-red-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 text-white py-2 px-4 rounded-lg"
              >
                -
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonInfoPage;
