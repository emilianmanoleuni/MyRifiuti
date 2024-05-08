const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const crypto = require('crypto');
const User = require('../models/User');
const router = express.Router();

// Registrazione di un nuovo utente
router.post('/register', [
  body('name').notEmpty().withMessage('Il nome è richiesto.'),
  body('surname').notEmpty().withMessage('Il cognome è richiesto.'),
  body('email').isEmail().withMessage('Devi inserire un\'email valida.')
    .custom(async email => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email già in uso.');
      }
    }),
  body('password').isLength({ min: 6 }).withMessage('La password deve essere di almeno 6 caratteri')
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
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
    
    // Salvataggio dell'utente
    await newUser.save();
    res.status(201).send('User created successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering new user.' });
  }
});

router.post('/checkEmail', [
  body('email').isEmail().withMessage('Devi inserire un\'email valida')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Email non valida');
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      console.log('Email non è unica');
      return res.json({ isUnique: false });  // L'email esiste già nel DB
    } else {
      console.log('Email è unica');
      return res.json({ isUnique: true });   // L'email è unica
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore interno del server" });
  }
});

// Login dell'utente
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          console.log('Utente non trovato')
          return res.status(404).json({ message: 'Utente non trovato' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Credenziali non valide' });
      }

      const token = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
      );

      res.json({
          message: 'Login riuscito',
          token
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Errore del server' });
  }
});


module.exports = router;