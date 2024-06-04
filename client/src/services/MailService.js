import Api from '@/services/Api'

export default {
  sendEmail(argument){
    return Api().post('sendEmail', argument)
  }
}