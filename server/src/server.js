console.log('Hello from the server!')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//Auth
//require('dotenv').config({ path: './database.env' });
const mongoose = require('mongoose')
const User = require('./models/User.js')
const routes = require('./routes')
const { checkSchema } = require('express-validator')
const dbURI = `mongodb+srv://admin:admin@clustermain.n9dwne9.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMain`;

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use(express.json()); 

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

app.use('/api', routes); // Use auth only with /api

app.get('/status', (req, res) => {
    res.send({
        message: 'hello!'
    })
})

app.listen(process.env.PORT || 8081)