const Report = require('../models/Report')
const Status = require('../models/ReportStatus')

module.exports = {
    async sendReport (req, res) {
        try{
            console.log("CIAO")
            console.log(Status[1])
            console.log("NON CI SONO")
            // New report
            const newReport = new Report({
                type: req.body.reportType,
                title: req.body.reportTitle,
                road: req.body.reportRoad,
                roadNumber: req.body.reportRoadNumber,
                cap: req.body.reportCap,
                zone: req.body.reportZone,
                description: req.body.reportDescription,
                user: req.body.reportUserId,
                status: Status[0] // 0 Aperta 1 - In Corso - 2 Risolta
            });

            // Debugging console.log statements
            console.log('Type:', newReport.type);
            console.log('Title:', newReport.title);
            console.log('Road:', newReport.road);
            console.log('Road Number:', newReport.roadNumber);
            console.log('Cap:', newReport.cap);
            console.log('Description:', newReport.description);
            console.log('User:', newReport.user);
            console.log('Status:', newReport.status);

            // Save new Report
            await newReport.save()
                .then((result) => {
                    res.status(200).json(result);
                })
                .catch((error) => {
                    // Handle validation errors from Mongoose
                    if (error.errors) {
                        const validationErrors = Object.keys(error.errors).map(key => ({
                            path: key,
                            msg: error.errors[key].message
                        }));
                        res.status(400).json({ errors: validationErrors });
                    } else {
                        res.status(500).json('Error while saving the report');
                    }
                });
        } catch(err) {
            res.status(501).json('Error while sending the report')
        }
    },
}