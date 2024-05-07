console.log('Hello from the server!')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//Auth
//require('dotenv').config({ path: './database.env' });
const mongoose = require('mongoose')
const User = require('../models/User.js')
const authRoutes = require('../routes/authRoutes')
const dbURI = `mongodb+srv://admin:admin@clustermain.n9dwne9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMain`;

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

app.use('/api', authRoutes); // Usa le route di autenticazione sotto il prefisso /api

app.get('/status', (req, res) => {
    res.send({
        message: 'hello!'
    })
})

app.listen(process.env.PORT || 8081)