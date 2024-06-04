const express = require('express');
const router = express.Router();
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const CalendarController = require('./controllers/CalendarController');
const MapController = require('./controllers/MapController');
const AuthenticationValidator = require('./policies/AuthenticationValidator')
const GroupController = require('./controllers/GroupController');
const MailController = require('./controllers/MailController')




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

router.get('/getUserName',
    AuthenticationController.getUserName
)
router.get('/getEmail', 
    AuthenticationController.getEmail
)
router.get('/calendarAll',
    CalendarController.calendarAll
)

router.get('/getWasteDayNumber',
    CalendarController.getWasteDayNumber
)

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

/* router.get('/getMembers',
    GroupController.getGroupMembers
); */

router.post('/addMember',
    GroupController.addMember
)
router.post('/createGroup',
    GroupController.createGroup
)
router.get('/getGroup',
    GroupController.getGroup
)
router.post('/removeMember',
    GroupController.removeMember
)
router.post('/sendEmail',
    MailController.sendEmail
)


module.exports = router;
