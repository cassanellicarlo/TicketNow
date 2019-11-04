import hash from "./hash";
import axios from "axios";
import UserService from "../UserService";

const HTTP = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export default{

// Set Spotify Token in Local Storage
setToken(){
  let _token = hash.access_token;
  if (_token) {
      localStorage.setItem('spotifyToken',_token);
      this.getUserData();
      return true;
  }
},

// Get spotify token from local storage
getToken(){
  return localStorage.getItem('spotifyToken');
},

// Set User's favourite artists in Local Storage
setFavourites(artists){
  localStorage.setItem('favouriteArtists',JSON.stringify(artists));
},

// Get User's favourite artists from Local Storage
getFavourites(){
  return JSON.parse(localStorage.getItem('favouriteArtists'));
},

// Get Artist's id from Local Storage
getIdArtists(){
  return JSON.parse(localStorage.getItem('idArtists'));
},

// Get user's artist and save the id
getPrefers(cb){
  HTTP.get('me/following?type=artist', {
    headers: {
      'Authorization': 'Bearer ' + this.getToken(),
    }}).then((response)=>{
      let favouriteArtists = [];
      let idArtists=[];
      let artists = response.data.artists.items;
      artists.forEach((artist)=>{
          favouriteArtists.push(artist.name);
          idArtists.push(artist.id);
      });
      localStorage.setItem('idArtists',JSON.stringify(idArtists));
      localStorage.setItem('favouriteArtists',JSON.stringify(favouriteArtists));

      cb();

      if(idArtists!==undefined && idArtists!=null){
        let albums=[];
        for(let i=0;i<idArtists.length;i++){
          this.setAlbums(idArtists[i],favouriteArtists[i],albums);
            }
        }
  
        
    });
},

   // Get artist's album from the preferite user's artists
   setAlbums(idArtist,artist, albums){
    HTTP.get('artists/'+idArtist+'/albums?limit=4',{
     headers: {
       Authorization: 'Bearer ' + this.getToken()
   }
 })
 .then( function (response) {
   albums.push(artist);
     for (let i = 0; i < 4; i++) {
       albums.push(response.data.items[i].images[1].url);
     }
     localStorage.setItem('myAlbums', JSON.stringify(albums));
   })
 },

 getAlbums(){
   return JSON.parse(localStorage.getItem('myAlbums'));
 },

  // Get user's personal information
  getUserData(){
      HTTP.get('me',{
        headers: {
          Authorization: 'Bearer ' + this.getToken()
      }
    })
    .then( function(response){
        UserService.loginSpotify(response.data.display_name,response.data.email).then((response)=>{
          localStorage.setItem('user',JSON.stringify(response.data));
        }); 
      })
  },

  // Search Artist
  searchArtist(artist){
    return HTTP.get('search?type=artist&q='+artist, {
      headers: {
        'Authorization': 'Bearer ' + this.getToken()
      }})
  }
}

