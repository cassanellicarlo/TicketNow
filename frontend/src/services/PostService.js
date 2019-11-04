import axios from "axios";

const hostname = window.location.hostname;

const HTTP = axios.create({
  baseURL: "http://"+hostname+":8080/api/posts",
})

export default {
    addPost(title, text,price,userId,owner){
        return HTTP.post('/add',  null, { params: {
          title,
          text,
          price,
          userId,
          owner
      }})
    },

    getPosts(){
      return HTTP.get('/all');
    },    

    addComment(postId,text,userId){
      return HTTP.post('/'+postId+'/addComment', null, {params: {
        text,
        userId
      }})
    },

    isFauvorite(postId,userId){
      return HTTP.get('/'+postId+'/isFauvorite',null,{params: {
        userId
      }})
    }, 

    likePost(postId,userId){
      return HTTP.post('/'+postId+'/like',null,{params: {
        userId
      }})
    },

}