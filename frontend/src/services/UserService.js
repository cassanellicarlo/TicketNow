import axios from "axios";

const hostname = window.location.hostname;

const HTTP = axios.create({
  baseURL: "http://"+hostname+":8080/api/users",
})

export default {
  getAllUsers () {
    return HTTP.get('/all')
  },
  addUser (user) {
    return HTTP.post('/register', user)
  },
  loginSpotify(name, mail){
    return HTTP.post('/spotify',  null, { params: {
      name,
      mail
    }})},

  loginUser (username,password) {
    return HTTP.post('/login',  null, { params: {
      username,
      password
    }})
  },

  getFauvoritesPosts(userId){
    return HTTP.get('/'+userId+'/favorites')
  },

  getUser(userId){
    return HTTP.get('/'+userId);
  }

}