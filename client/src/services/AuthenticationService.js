import Api from '@/services/Api'

export default {
    register(credendials){
        return Api().post('register', credendials)
    },
    login(credentials){
        return Api().post('login', credentials)
    },
    async getZone() {
        try {
          const response = await Api().get('zone')
          return response.data
        } catch (err) {
          console.error('Si è verificato un errore durante il recupero delle zone: ', err); 
        }
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
    }
}