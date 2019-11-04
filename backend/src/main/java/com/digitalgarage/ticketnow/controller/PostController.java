package com.digitalgarage.ticketnow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalgarage.ticketnow.model.Comment;
import com.digitalgarage.ticketnow.model.Post;
import com.digitalgarage.ticketnow.model.User;
import com.digitalgarage.ticketnow.service.PostService;
import com.digitalgarage.ticketnow.service.UserService;


@RestController
@CrossOrigin
@RequestMapping(path="/api/posts")
public class PostController {

	@Autowired
	private PostService postService;
	
	@Autowired
	private UserService userService;

	@GetMapping(path="/all")
	public Iterable<Post> getAllPosts() {
		return postService.findAll();
	}


	@GetMapping(path="/{id}/isFavourite")//
	public boolean isFavourite(@PathVariable Integer id, @RequestParam Integer user_id) {
		System.out.println(id);

		User user = new User();
		user = userService.findById(user_id).orElse(null);
				if (user != null) {
					if(user.getLikedPosts().size()!=0)
						return true;
					else
						return false;
				}
				else
				return false;
		}

	// ADD POST
	@PostMapping(path="/add")
	public ResponseEntity addNewPost(@RequestParam String title, @RequestParam String text,	@RequestParam String price, @RequestParam int userId, @RequestParam String owner) {

		User user = userService.findById(userId).orElse(null);
		Post post = new Post();
		
		if(user!=null) {
			post.setTitle(title);
			post.setText(text);
			post.setOwner(owner);
			post.setPrice(price);
			post.setUser(user);
			postService.savePost(post);
			return ResponseEntity.ok().body(post);
		}
		
		return ResponseEntity.badRequest().body("User not found");
	}

	
	@PostMapping(path="/{id}/like")
	public ResponseEntity addToFavorites(@PathVariable Integer id, @RequestParam int userId){
		Post post = postService.findById(id).orElse(null);
		User user = userService.findById(userId).orElse(null);
		if(user!=null) {
			if (post!=null) {
				post.addFavorites(user);
				postService.savePost(post);
				user.addLikedPost(post);
				userService.saveUser(user);
				return ResponseEntity.ok().body("ok");
			}
			else
				return ResponseEntity.badRequest().body("Post not found");
		}
		else
			return ResponseEntity.badRequest().body("User not found");
	}
	
	// ADD COMMENT BY POST ID
	@PostMapping(path="/{postId}/addComment")
	public ResponseEntity addComment(@PathVariable int postId, @RequestParam String text, @RequestParam int userId) {
		
		Post post = postService.findById(postId).orElse(null);
		User user = userService.findById(userId).orElse(null);
		Comment comment = new Comment();
		comment.setUser(user);
		comment.setPost(post);
		comment.setText(text);
		
		if(post!=null) {		
			post.addComment(comment);
			post.setUser(user);
			postService.savePost(post);
			return ResponseEntity.ok().body(post);
		}
		
		else {
			return ResponseEntity.badRequest().body("Post not found");
		}
		
		
	}
	
	

}