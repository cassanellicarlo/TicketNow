import axios from "axios";

const hostname = window.location.hostname;

const HTTP = axios.create({
  baseURL: "http://"+hostname+":8080/api/countries",
})

export default {
  getAllCountries() {
    return HTTP.get('/all')
  }
}