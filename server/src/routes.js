const express = require('express');
const router = express.Router();
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const Marker = require('./models/Marker')

// Definitions of Routes
router.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
);

router.post('/login',
    AuthenticationController.login
);

router.get('/marker', async (req, res, next) => {
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

router.post('/putMarker', async (req, res, next) => {
    const newMarker = new Marker({
        lat: 46.10545314902608, 
        lng: 11.101276873613214,
        label: "CRM Gardolo"
    });
    await newMarker.save();
    res.status(200).send('inserito');
})

module.exports = router;
