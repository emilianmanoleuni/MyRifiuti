import Api from '@/services/Api'

export default {
    register(credendials){
        return Api().post('register', credendials)
    },
    login(credentials){
        return Api().post('login', credentials)
    },
    getUserZone(userId){
      const token = localStorage.getItem('token');
      return Api().get('getUserZone', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          userId: userId
        }
      })
    },
    getUserName(userId){
      return Api().get('getUserName', {
        params: {
          userId: userId
        }
      })
    },
    getEmail(userId){
      return Api().get('getEmail', {
        params: {
          userId: userId
        }
    }),
    updateUserZone(user){
      return Api().post('updateUserZone', user)
    },
    loginEnte(credendials){
        return Api().post('loginEnte', credendials)
    }
}