const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Registrazione di un nuovo utente
router.post('/register', async (req, res) => {
  try {
    // Hash della password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    // Creazione dell'utente
    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword
    });

    console.log(`Name: ${newUser.name}`);
    console.log(`Surname: ${newUser.surname}`);
    console.log(`Email: ${newUser.email}`);
    console.log(`Password: ${newUser.hashedPassword}`);
    
    // Salvataggio dell'utente
    await newUser.save();
    res.status(201).send('User created successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering new user.' });
  }
});

// Login dell'utente
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send('User not found.');
    }

    // Confronto della password inviata con quella hashata nel db
    if (await bcrypt.compare(req.body.password, user.password)) {
      // Creazione del token JWT
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET, // Assicurati che questa variabile sia nel tuo .env
        { expiresIn: '24h' }
      );
      
      res.json({ message: 'Logged in successfully!', token });
    } else {
      res.status(400).send('Invalid credentials.');
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
