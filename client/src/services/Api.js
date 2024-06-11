import axios from 'axios'

export default () => {
  return axios.create({
    baseURL: `http://localhost:8081/apiv2`,
    //baseURL: `https://myrifiuti.onrender.com/api`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}` //Token on LocalStorage
    }
  })
}