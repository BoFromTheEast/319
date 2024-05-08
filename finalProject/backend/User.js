const mongoose = require('mongoose');

const userSchema = new Schema({
  loginName: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Remember to hash passwords before storing
  pokemonTeam: {
    type: [pokemonSchema],
    validate: [teamLimit, '{PATH} exceeds the limit of 6'],
  },
});
module.exports = mongoose.model('User', userSchema);
