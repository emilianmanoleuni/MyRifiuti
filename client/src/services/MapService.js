import Api from '@/services/Api'

export default {
  async getZone() {
    try {
      const response = await Api().get('zone')
      return response.data
    } catch (err) {
      console.error('Si è verificato un errore durante il recupero delle zone: ', err); 
    }
  },
  async getMarker() {
    try {
      const response = await Api().get('marker');
      return response.data; 
    } catch (error) {
      console.error('Si è verificato un errore durante il recupero dei dati del marker:', error); 
    }
  },
  async getCRM() {
    try {
      const response = await Api().get('crm');
      return response.data; 
    } catch (error) {
      console.error('Si è verificato un errore durante il recupero dei dati del marker:', error); 
    }
  },
  async getCestini(){
    try {
      const response = await Api().get('cestini');
      return response.data; 
    } catch (error) {
      console.error('Si è verificato un errore durante il recupero dei dati del marker:', error); 
    } 
  }
}