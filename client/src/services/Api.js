import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/api`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` //Token on LocalStorage
    }
  })
}