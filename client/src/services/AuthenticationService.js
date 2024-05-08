import Api from '@/services/Api'

export default {
    register(credendials){
        return Api().post('register', credendials)
    },
    checkEmail(email){
        return Api().post('checkEmail', email)
    },
    login(credentials){
        return Api().post('login', credentials)
    }
}