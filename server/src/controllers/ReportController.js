const Report = require('../models/Report')
const ReportType = require('../models/ReportTypes')
const Status = require('../models/ReportStatus')
const Caps = require('../models/ReportCaps')

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

    async getReportTypes (req, res) {
        try{
            const reportType = ReportType;
            res.status(200).json(reportType)
        } catch(err) {
            res.status(501).json('Error while sending the report types')
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
    
    async getStatusTypes (req, res) {
        try{
            const statusType = Status;
            res.status(200).json(statusType);
        } catch(err) {
            res.status(501).json('Error while sending the report')
        }
    },

    async getReportCaps (req, res) {
        try{
            const caps = Caps;
            res.status(200).json(caps);
        } catch(err) {
            res.status(501).json('Error while sending the CAPS')
        }
    },

    async saveReportStatus (req, res) {
        try{
            const report = await Report.findById(req.body._id);
            report.status = req.body.status;
            const updatedReport = await report.save();
            res.status(200).json(updatedReport);
        } catch(err) {
            res.status(501).json('Error while saving status of the report')
        }
    },

    async getNumberOfAllReports (req, res) {
        try{
            const nReports = await Report.countDocuments();
            res.status(200).json({count: nReports});
        } catch(err) {
            res.status(501).json('Error while retrieving number of reports')
        }
    },

    async getNumberByStatusOfReports (req, res) {
        try{
            const { status } = req.query;
            const query = status ? { status } : {};
            const counts = await Report.aggregate([
                { $match: query }, 
                {
                    $group: {
                        _id: "$status",
                        count: { $sum: 1 }
                    }
                }
            ]);
            res.status(200).json({count: counts});
        } catch(err) {
            res.status(501).json('Error while retrieving number of reports filtered by status')
        }
    },
}