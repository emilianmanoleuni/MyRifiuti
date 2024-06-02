import Api from '@/services/Api'

export default {
  getGroup(userId){
      return Api().get('getGroup', {
        params: {
          userId: userId
        }
      })
      .then(response => {
        return response.data[0];
      }).catch(error => {
        console.error('Si è verificato un errore durante il recupero de gruppi:', error);
      })
  },
  createGroup(argument){
    return Api().post('createGroup', argument)
    .then(response => {
      return response;
    }).catch(error => {
      console.error('Si è verificato un errore durante la creazione del gruppo:', error);
    })
  },
  addMember(argument){
    return Api().post('addMember', argument)
    .then(response => {
      return response;
    }).catch(error => {
      console.error("Si è verificato un errore durante l'aggiunta del membro:", error);
    })
  },
  removeMember(argument){
    return Api().post('removeMember', argument)
    .then(response => {
      return response;
    }).catch(error => {
      console.error("Si è verificato un errore durante la rimozione del membro:", error);
    })
  }
}