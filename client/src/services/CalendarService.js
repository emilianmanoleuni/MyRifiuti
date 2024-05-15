import Api from '@/services/Api'

export default {
    getWasteDayNumber(location, wasteType) {
        return Api().get('getWasteDayNumber', {
            params: {
                zone: location,
                wasteType: wasteType
            }
        }).then(response => {
            return response.data.weekdayNumber;
        }).catch(error => {
            console.error('Errore nel recupero del numero del giorno della settimana:', error);
            return null;
        });
    }    
}