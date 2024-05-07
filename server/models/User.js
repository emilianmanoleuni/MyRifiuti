const mongoose = require('mongoose');

// Schema dell'utente
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    unique: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // `timestamps` aggiunge automaticamente `createdAt` e `updatedAt`

const User = mongoose.model('User', userSchema);

module.exports = User;
