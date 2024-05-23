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
    async getStatusType() {
        return Api().get('getStatusType')
    }      
}