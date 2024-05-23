const Report = require('../models/Report')
const Status = require('../models/ReportStatus')

module.exports = {
    async sendReport (req, res) {
        try{
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

    async getAllReports (req, res) {
        try{
            const reports = await Report.find();
            res.status(200).json(reports);
        } catch(err) {
            res.status(501).json('Error while sending the report')
        }
    },
    
    async getStatusType (req, res) {
        try{
            const statusType = Status;
            res.status(200).json(statusType);
        } catch(err) {
            res.status(501).json('Error while sending the report')
        }
    },
}