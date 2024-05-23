import Api from '@/services/Api'

export default {
    sendReport(report) {
        return Api().post('sendReport', report);
    }    
}