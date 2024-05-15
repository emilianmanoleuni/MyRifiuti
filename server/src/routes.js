const express = require('express');
const router = express.Router();
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');

const AuthenticationValidator = require('./policies/AuthenticationValidator')
const Marker = require('./models/Marker');
const Zone = require('./models/Zone')

const MapController = require('./controllers/MapController');


// Definitions of Routes
router.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
);

router.post('/login',
    AuthenticationController.login
);


router.get('/getUserZone',
    //AuthenticationValidator.validator, NEED FIX FOR TOKEN
    AuthenticationController.getUserZone
);

router.get('/marker',
    MapController.getMarker
);


router.get('/crm',
    MapController.getCRM
)

router.get('/cestini',
    MapController.getCestini
)

router.get('/zone',
    MapController.getZone
);

router.post('/putMarker',
    MapController.putMarker
);

module.exports = router;
