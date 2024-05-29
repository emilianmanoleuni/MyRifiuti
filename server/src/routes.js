const express = require('express');
const router = express.Router();
const AuthenticationController = require('./controllers/AuthenticationController');
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const CalendarController = require('./controllers/CalendarController');
const MapController = require('./controllers/MapController');
const ReportController = require('./controllers/ReportController')
const AuthenticationValidator = require('./policies/AuthenticationValidator')


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

router.post('/loginEnte',
    AuthenticationController.loginEnte
);

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

router.post('/sendReport',
    ReportController.sendReport
);

router.get('/getReportTypes',
    ReportController.getReportTypes
)

router.get('/getAllReports',
    ReportController.getAllReports
);

router.get('/getStatusTypes',
    ReportController.getStatusTypes
);

router.get('/getReportCaps',
    ReportController.getReportCaps
);

router.post('/saveReportStatus',
    ReportController.saveReportStatus
);

router.get('/getNumberOfAllReports',
    ReportController.getNumberOfAllReports
);

router.get('/getNumberByStatusOfReports',
    ReportController.getNumberByStatusOfReports
);


module.exports = router;
