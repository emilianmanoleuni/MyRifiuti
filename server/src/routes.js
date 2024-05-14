const express = require('express');
const router = express.Router();
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const MapController = require('./controllers/MapController');

// Definitions of Routes
router.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
);

router.post('/login',
    AuthenticationController.login
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
