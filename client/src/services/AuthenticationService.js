import Api from '@/services/Api'

export default {
    register(credendials){
        return Api().post('register', credendials)
    },
    login(credentials){
        return Api().post('login', credentials)
    }
}