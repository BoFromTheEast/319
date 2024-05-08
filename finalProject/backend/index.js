var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Extract Schema from mongoose

app.use(cors());
app.use(bodyParser.json());

const port = 8081; // Define the port
const host = 'localhost'; // Define the host

const url = 'mongodb://localhost:27017/';

const dbName = 'FinalProject'; // Specify your database name here

// Define a simple User schema as an example
const moveSchema = new Schema({ name: String });

const pokemonSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  moves: [moveSchema],
});

const userSchema = new Schema({
  loginName: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Remember to hash passwords before storing
  pokemonTeam: {
    type: [pokemonSchema],
    validate: [teamLimit, '{PATH} exceeds the limit of 6'],
  },
});

function teamLimit(val) {
  return val.length <= 6;
}

// Create a model from the schema
const User = mongoose.model('User', userSchema);

// Endpoint to get a user's Pokémon team
app.get('/user/:loginName/pokemon', async (req, res) => {
  try {
    // const user = await User.findOne({ loginName: req.params.loginName });
    const user = await User.findOne({ loginName: 'AshKetchum' });

    console.log('Received loginName:', req.params.loginName); // Log the input

    if (!user) {
      return res.status(404).send('User not found');
    }
    const pokemonTeam = user.pokemonTeam.map((pokemon) => {
      return {
        name: pokemon.name,
        type: pokemon.type,
        moves: pokemon.moves.map((move) => move.name),
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

//create user

// Endpoint to create a new user
// Endpoint to create a new user
app.post('/signup', async (req, res) => {
  const { loginName, password } = req.body;

  if (!loginName || !password) {
    return res.status(400).send('Login name and password are required');
  }

  try {
    // Create a new user object directly with the received password
    const newUser = new User({
      loginName: loginName,
      password: password, // Storing the password directly without hashing
      pokemonTeam: [], // Starts with an empty Pokémon team
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

// Endpoint to add a Pokémon to a user's team
app.post('/user/:loginName/pokemon', async (req, res) => {
  const { loginName } = req.params;
  const { name, type } = req.body;

  if (!name || !type) {
    return res.status(400).send('Pokémon name and type are required');
  }

  try {
    // Find the user by login name and update their Pokémon team
    const user = await User.findOne({ loginName: loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Add the new Pokémon to the user's team
    user.pokemonTeam.push({
      name: name,
      type: type,
      moves: [], // No moves specified
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
      // If matching, respond with a success message (and potentially a token or session id)
      res.status(200).send('Login successful');
    } else {
      // If not matching, respond with an unauthorized message
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Error during login');
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
  '/user/:loginName/pokemon/:pokemonName/move/:moveName',
  async (req, res) => {
    const { loginName, pokemonName, moveName } = req.params;

    try {
      // Find the user
      const user = await User.findOne({ loginName: loginName });

      if (!user) {
        return res.status(404).send('User not found');
      }

      // Find the Pokémon and remove the move
      const pokemon = user.pokemonTeam.find((p) => p.name === pokemonName);
      if (!pokemon) {
        return res.status(404).send('Pokémon not found');
      }

      // Filter out the move to be removed
      const initialMovesCount = pokemon.moves.length;
      pokemon.moves = pokemon.moves.filter((move) => move.name !== moveName);

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

// Endpoint to remove a Pokémon from a user's team
app.delete('/user/:loginName/pokemon/:pokemonName', async (req, res) => {
  const { loginName, pokemonName } = req.params;

  try {
    // Find the user
    const user = await User.findOne({ loginName: loginName });

    if (!user) {
      return res.status(404).send('User not found');
    }

    // Filter out the Pokémon to be removed
    const initialTeamCount = user.pokemonTeam.length;
    user.pokemonTeam = user.pokemonTeam.filter(
      (pokemon) => pokemon.name !== pokemonName
    );

    if (user.pokemonTeam.length === initialTeamCount) {
      return res.status(404).send('Pokémon not found');
    }

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
app.post('/user/:loginName/pokemon/:pokemonName/move', async (req, res) => {
  const { loginName, pokemonName } = req.params;
  const { name } = req.body; // Assuming the move has only a name attribute

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
    const pokemon = user.pokemonTeam.find((p) => p.name === pokemonName);

    if (!pokemon) {
      return res.status(404).send('Pokémon not found');
    }

    // Add the new move to the Pokémon's moves array
    if (pokemon.moves.length < 4) {
      // Check if less than 4 moves to comply with the limit
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

mongoose
  .connect(`${url}${dbName}`)
  .then(() => {
    console.log('Connected successfully to MongoDB using Mongoose');
    app.listen(port, host, () => {
      console.log(`Server running at http://${host}:${port}`);
    });
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));
