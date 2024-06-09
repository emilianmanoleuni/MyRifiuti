import Api from '@/services/Api';

export default {
  getGroup(userId) {
    return Api()
      .get('getGroup', {
        params: {
          userId: userId,
        },
      })
      .then((response) => {
        return response.data[0];
      })
      .catch((error) => {
        throw error;
      });
  },
  createGroup(argument) {
    return Api().post('createGroup', argument)
  },
  addMember(argument) {
    return Api().post('addMember', argument)
  },
  removeMember(argument) {
    return Api().post('removeMember', argument)
  }
};