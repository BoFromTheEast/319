//setup
var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const Schema = mongoose.Schema;
app.use(cors());
app.use(bodyParser.json());
const port = 8081;
const host = 'localhost';
const url = 'mongodb://localhost:27017/';
const dbName = 'FinalProject';

//schemas
const moveSchema = new Schema({ name: String });
const statsSchema = new Schema({
  health: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  specialAttack: Number,
  specialDefense: Number,
  speed: Number,
});
const pokemonSchema = new Schema({
  name: { type: String, required: true },
  type: [{ type: String, required: true }],
  stats: statsSchema,
  moves: [moveSchema],
  possibleMoves: [{ type: String, required: true }],
  dreamWorldImageUrl: { type: String, required: true },
});
const userSchema = new Schema({
  loginName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pokemonTeam: {
    type: [pokemonSchema],
    validate: [teamLimit, '{PATH} exceeds the limit of 6'],
  },
});
//make team max of 6
function teamLimit(val) {
  return val.length <= 6;
}
// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Endpoint to get a user's Pokémon team
app.get('/user/:loginName/pokemon', async (req, res) => {
  try {
    const user = await User.findOne({ loginName: req.params.loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const pokemonTeam = user.pokemonTeam.map((pokemon) => {
      return {
        name: pokemon.name,
        type: pokemon.type,
        stats: {
          health: pokemon.stats.health,
          attack: pokemon.stats.attack,
          defense: pokemon.stats.defense,
          specialAttack: pokemon.stats.specialAttack,
          specialDefense: pokemon.stats.specialDefense,
          speed: pokemon.stats.speed,
        },
        dreamWorldImageUrl: pokemon.dreamWorldImageUrl,
      };
    });

    res.json({
      loginName: user.loginName,
      pokemonTeam: pokemonTeam,
    });
  } catch (error) {
    console.error('Database query failed', error);
    res.status(500).send('Failed to retrieve user data');
  }
});

// Endpoint to create a new Pokémon for a user
app.post('/user/:loginName/pokemon', async (req, res) => {
  const { loginName } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Pokémon name is required');
  }

  try {
    // Fetch Pokémon details from PokéAPI
    const pokeApiResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );

    const { stats, moves, types, sprites } = pokeApiResponse.data;

    // stats
    const pokemonStats = {
      health: stats.find((stat) => stat.stat.name === 'hp')?.base_stat,
      attack: stats.find((stat) => stat.stat.name === 'attack')?.base_stat,
      defense: stats.find((stat) => stat.stat.name === 'defense')?.base_stat,
      specialAttack: stats.find((stat) => stat.stat.name === 'special-attack')
        ?.base_stat,
      specialDefense: stats.find((stat) => stat.stat.name === 'special-defense')
        ?.base_stat,
      speed: stats.find((stat) => stat.stat.name === 'speed')?.base_stat,
    };

    // moves
    const pokemonMoves = moves.map((move) => move.move.name);

    // types
    const pokemonTypes = types.map((type) => type.type.name);

    // Extract dream_world front default image URL if it exists
    const imageUrl = sprites.other['dream_world']
      ? sprites.other['dream_world'].front_default
      : 'default_image_url_here';

    // Find the user by login name
    const user = await User.findOne({ loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Add the new Pokémon to the user's team
    user.pokemonTeam.push({
      name,
      type: pokemonTypes,
      stats: pokemonStats,
      moves: [],
      possibleMoves: pokemonMoves,
      dreamWorldImageUrl: imageUrl,
    });

    // Save the updated user document
    await user.save();

    // Respond with success message
    res.status(200).send('Pokémon added successfully');
  } catch (error) {
    console.error('Error adding Pokémon:', error);
    res.status(500).send('Failed to add Pokémon');
  }
});
// Endpoint to create a new user
app.post('/signup', async (req, res) => {
  const { name, loginName, password } = req.body;

  if (!loginName || !password) {
    return res.status(400).send('Login name and password are required');
  }

  try {
    // Create a new user object directly with password
    const newUser = new User({
      name: name,
      loginName: loginName,
      password: password,
      pokemonTeam: [],
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error creating new user:', error);
    res.status(500).send('Error creating new user');
  }
});

// Endpoint to handle user login
app.post('/login', async (req, res) => {
  const { loginName, password } = req.body;

  if (!loginName || !password) {
    return res.status(400).send('Both login name and password are required');
  }

  try {
    // Find the user by login name
    const user = await User.findOne({ loginName: loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if the provided password matches the stored password
    if (user.password === password) {
      // If matching, respond with a success message and token
      const token = 'generated-token-here';
      res.status(200).json({ message: 'Login successful', token: token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Endpoint to update user password
app.put('/user/:loginName/password', async (req, res) => {
  const { loginName } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).send('New password is required');
  }

  try {
    // Find the user by login name
    const user = await User.findOne({ loginName: loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Update the user's password
    user.password = newPassword;

    // Save the updated user document
    await user.save();

    // Respond with a success message
    res.status(200).send('Password updated successfully');
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).send('Failed to update password');
  }
});

// Endpoint to remove a move from a Pokémon in a user's team
app.delete(
  '/user/:loginName/pokemon/:pokemonId/move/:moveId',
  async (req, res) => {
    const { loginName, pokemonId, moveId } = req.params;

    try {
      // Find the user
      const user = await User.findOne({ loginName });

      if (!user) {
        return res.status(404).send('User not found');
      }

      // Find the Pokémon and remove the move
      const pokemon = user.pokemonTeam.find(
        (p) => p._id.toString() === pokemonId
      );
      if (!pokemon) {
        return res.status(404).send('Pokémon not found');
      }

      // Filter out the move to be removed by its ID
      const initialMovesCount = pokemon.moves.length;
      pokemon.moves = pokemon.moves.filter(
        (move) => move._id.toString() !== moveId
      );
      //if actually removed then this should be false (checker)
      if (pokemon.moves.length === initialMovesCount) {
        return res.status(404).send('Move not found');
      }

      // Save the updated user document
      await user.save();

      // Respond with success message
      res.status(200).send('Move removed successfully');
    } catch (error) {
      console.error('Error removing move:', error);
      res.status(500).send('Failed to remove move');
    }
  }
);

// Endpoint to remove a Pokémon from a user's team by ID
app.delete('/user/:loginName/pokemon/:pokemonId', async (req, res) => {
  const { loginName, pokemonId } = req.params;

  try {
    // Find the user
    const user = await User.findOne({ loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Find the index of the Pokémon to be removed
    const indexToRemove = user.pokemonTeam.findIndex(
      (pokemon) => pokemon._id.toString() === pokemonId
    );

    if (indexToRemove === -1) {
      return res.status(404).send('Pokémon not found');
    }

    // Remove the Pokémon from the team array
    user.pokemonTeam.splice(indexToRemove, 1);

    // Save the updated user document
    await user.save();

    // Respond with success message
    res.status(200).send('Pokémon removed successfully');
  } catch (error) {
    console.error('Error removing Pokémon:', error);
    res.status(500).send('Failed to remove Pokémon');
  }
});

// Endpoint to add a move to a Pokémon in a user's team
app.post('/user/:loginName/pokemon/:pokemonId/move', async (req, res) => {
  const { loginName, pokemonId } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Move name is required');
  }

  try {
    // Find the user and the specific Pokémon
    const user = await User.findOne({ loginName: loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Find the Pokémon to add the move to
    const pokemon = user.pokemonTeam.find(
      (p) => p._id.toString() === pokemonId
    );

    if (!pokemon) {
      return res.status(404).send('Pokémon not found');
    }

    // Add the new move to the Pokémon's moves array
    if (pokemon.moves.length < 4) {
      // Check if less than 4 moves first
      pokemon.moves.push({ name: name });
    } else {
      return res.status(400).send('No more than 4 moves allowed');
    }

    // Save the updated user document
    await user.save();

    // Respond with success message
    res.status(200).send('Move added successfully');
  } catch (error) {
    console.error('Error adding move:', error);
    res.status(500).send('Failed to add move');
  }
});

//get pokemon name and id only
app.get('/user/:loginName/pokemon/names', async (req, res) => {
  try {
    const user = await User.findOne({ loginName: req.params.loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // grab IDs and names of the Pokémon
    const pokemonData = user.pokemonTeam.map((pokemon) => ({
      id: pokemon._id,
      name: pokemon.name,
    }));

    res.json(pokemonData);
  } catch (error) {
    console.error('Database query failed', error);
    res.status(500).send('Failed to retrieve user data');
  }
});

//endpoint to get all possible moves for a Pokémon in a user's team
app.get('/user/:loginName/pokemon/:pokemonId/moves', async (req, res) => {
  try {
    // Find the user by login name
    const user = await User.findOne({ loginName: req.params.loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Find the Pokémon in the user's team by ID
    const pokemon = user.pokemonTeam.find(
      (p) => p._id.toString() === req.params.pokemonId
    );

    if (!pokemon) {
      return res.status(404).send('Pokémon not found in user team');
    }

    // Return the possible moves for the Pokémon
    res.json(pokemon.possibleMoves);
  } catch (error) {
    console.error('Database query failed', error);
    res.status(500).send('Failed to retrieve Pokémon moves');
  }
});

// Get all KNOWN moves for a specific Pokémon by user email and Pokémon ID
app.get('/user/:loginName/pokemon/:pokemonId/movess', async (req, res) => {
  try {
    const { loginName, pokemonId } = req.params;

    // Find the user
    const user = await User.findOne({ loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Find the Pokémon in the user's team by ID
    const pokemon = user.pokemonTeam.find(
      (p) => p._id.toString() === pokemonId
    );

    if (!pokemon) {
      return res.status(404).send('Pokémon not found');
    }

    // Get moves for the Pokémon
    const moves = pokemon.moves;

    res.json(moves);
  } catch (error) {
    console.error('Database query failed', error);
    res.status(500).send('Failed to retrieve moves for the Pokémon');
  }
});

mongoose
  .connect(`${url}${dbName}`)
  .then(() => {
    console.log('Connected successfully to MongoDB using Mongoose');
    app.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}`);
    });
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));
