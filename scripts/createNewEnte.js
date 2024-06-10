const mongoose = require('mongoose');
const Ente = require('../Ente');
const prompt = require('prompt');
const bcrypt = require('bcryptjs');

// Connection to MongoDB
mongoose.connect('mongodb+srv://admin:admin@clustermain.n9dwne9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMain', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

// Credentials from keyboard
function getCredentials() {
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.get(['id', 'password'], function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

// Send Ente to db
async function newEnte() {
  try {
    const credentials = await getCredentials();
    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    const newEnte = new Ente({
      username: credentials.id,
      password: hashedPassword
    });

    await newEnte.save();
    console.log('Ente creato con successo!');
  } catch (error) {
    console.error('Errore durante la creazione:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Do
newEnte();
