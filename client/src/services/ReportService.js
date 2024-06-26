import Api from '@/services/Api'

export default {
    // ------- USER ------- //
    sendReport(report) {
        return Api().post('sendReport', report);
    },
    async getReportTypes() {
        return Api().get('getReportTypes')
    },
    async getReportCaps() {
        return Api().get('getReportCaps')
    },
    // ------- ENTE ------- //
    async getAllReports() {
        return Api().get('getAllReports')
    },
    async getStatusTypes() {
        return Api().get('getStatusTypes')
    },
    async saveReportStatus(report) {
        return Api().post('saveReportStatus', report)
    },
    async getNumberOfAllReports(){
        return Api().get('getNumberOfAllReports')
    },
    async getNumberByStatusOfReports(status){
        return Api().get('getNumberByStatusOfReports', { params: { status } })
    },
    async getAllZonesStatuses(){
        return Api().get('getAllZonesStatuses')
    },      
    async getNumerReportsForZones(){
        return Api().get('getNumerReportsForZones')
    },    
}