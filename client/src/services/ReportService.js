import Api from '@/services/Api'

export default {
    // ------- USER ------- //
    sendReport(report) {
        return Api().post('sendReport', report);
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
}