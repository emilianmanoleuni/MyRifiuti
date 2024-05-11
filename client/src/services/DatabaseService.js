import Api from '@/services/Api'

export default {
  async getMarker() {
    try {
      const response = await Api().get('marker');
      console.log(response.data)
      return response.data; 
    } catch (error) {
      console.error('Si è verificato un errore durante il recupero dei dati del marker:', error); 
    }
  }
}