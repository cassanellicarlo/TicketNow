import axios from "axios";

const APIKEY = "hOQGq4yzkAGKcwH1FxwhGSOKJcK9kiFg";

const HTTP = axios.create({
    baseURL: "https://app.ticketmaster.com/discovery/v2/",
  })

  export default {
    getAllEvents () {
      return HTTP.get('/all')
    },

    getEventByKeyword(keyword){
      return HTTP.get(`/events.json?apikey=${APIKEY}&keyword=${keyword}&sort=date,asc`);
    },

    getEventByCountry(country){
      return HTTP.get(`/events.json?apikey=${APIKEY}&keyword=music&countryCode=${country}&sort=date,asc`);
    }
   
  }