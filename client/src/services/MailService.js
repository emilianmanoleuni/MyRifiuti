import Api from '@/services/Api'

export default {
  sendEmail(argument){
    return Api().post('sendEmail', argument)
  },
  sendReportUpdateEmail(argument){
    return Api().post('sendEmail', {
      userName: argument.userName,
      userEmail: argument.userEmail,
      subject: 'Aggiornamento status segnalazione ' + argument.reportId,
      text: argument.userName + ' la tua segnalazione è passata allo stato ' + argument.status
    })
  }
}