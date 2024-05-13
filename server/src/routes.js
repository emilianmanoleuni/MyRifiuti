const express = require('express');
const router = express.Router();
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const Marker = require('./models/Marker');
const Zone = require('./models/Zone')

// Definitions of Routes
router.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
);

router.post('/login',
    AuthenticationController.login
);

router.get('/marker', async (req, res) => {
    try{
        Marker.find()
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(500).json('No markers found')
        })
    } catch(err) {
        res.status(501).json('Error retrieving data from database')
    }
});

router.get('/zone', async (req, res) => {
    try{
        res.status(200).json(Zone.circoscrizioni)
    } catch(err){
        res.status(501).json('Error')
    }
});

router.post('/putMarker', async (req, res) => {
    try{
        const newMarker = new Marker(req.body);
        await newMarker.save();
        res.status(200).send('inserito');
    } catch (err){
        res.status(500).json('Error saving new marker in database')
    }
});

module.exports = router;
