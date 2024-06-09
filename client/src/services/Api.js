import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8082/api`,
    //baseURL: `https://myrifiuti.onrender.com/api`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` //Token on LocalStorage
    }
  })
}