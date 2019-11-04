package com.digitalgarage.ticketnow.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.digitalgarage.ticketnow.model.Artist;
import com.digitalgarage.ticketnow.model.Post;
import com.digitalgarage.ticketnow.model.User;
import com.digitalgarage.ticketnow.repository.UserRepository;
import com.digitalgarage.ticketnow.service.UserService;

@RestController
@CrossOrigin
@RequestMapping(path="/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	// USER REGISTRATION
	@PostMapping(path="/register")
	public ResponseEntity addNewUser(@RequestBody User user) {
				
		User userCheck = userService.findByUserName(user.getUsername());
		User emailPhoneCheck = userService.findByEmailOrPhoneNumber(user.getEmail(), user.getPhoneNumber());
		
		if(userCheck != null) return ResponseEntity.badRequest().body("Username already in use");
		
		else if(emailPhoneCheck != null) {
			return ResponseEntity.badRequest().body("User already registered");
		}
		
		else {
			userService.saveUser(user);
			return ResponseEntity.ok(user);
		}
	}
	
	@PostMapping(path="/spotify")
	public ResponseEntity addNewSpotifyUser(@RequestParam String name, @RequestParam String mail) {

		User myUser = new User();
		
		User alreadyRegisteredUser = userService.findByEmail(mail);

		if (alreadyRegisteredUser!=null)
			return ResponseEntity.ok().body(alreadyRegisteredUser);

		else {
			myUser.setUsername(name);
			myUser.setEmail(mail);
			myUser.setSpotify("Y");
			userService.saveUser(myUser);
			return ResponseEntity.ok(myUser);
		}
	}
	
	/*
	// SPOTIFY REGISTER: ARRIVA LA EMAIL
	@PostMapping(path="/userpostlikes")
	public ResponseEntity addNewUserPostlike(@RequestBody User user, @RequestBody Post post) {
			Set<Post> postlikato = new HashSet<>();
			postlikato.add(post);


			userService.saveUser(updateUser);
			return ResponseEntity.ok(updateUser);
		}
	*/
	/*		Set<Post> postlikato = new HashSet<>();
			postlikato.add(post);
		
			User updateUser = userService.findById(user_id);
			updateUser.setLikedPosts(postlikato); 
			userService.saveUser(updateUser);
			return ResponseEntity.ok(updateUser);
			*/
	
	/*
	 * Set<Post> postlikato = new HashSet<>();
			postlikato.add(post);
			
			User updateUser = new User(user.getUsername(), user.getEmail(), user.getName(), user.getSurname(), user.getPassword(),
					user.getPhoneNumber(), user.getAge(), postlikato, user.getWork());
			
			user = updateUser;

			userService.saveUser(updateUser);
			return ResponseEntity.ok(updateUser);*/
	
	
	// USER LOGIN
	@PostMapping("/login")
	public ResponseEntity userLogin(@RequestParam String username, @RequestParam String password) {		
		
		String checkLoginType = userService.checkLoginType(username); //chiamata alla funzione check login type
		
		User u=null;
		User existsCheck=null;
		
		if (checkLoginType== "email") {
			u = userService.findByEmailAndPassword(username, password);
			existsCheck = userService.findByEmail(username);
		}
		if (checkLoginType== "user") {
			u = userService.findByUsernameAndPassword(username, password);
			existsCheck = userService.findByUsername(username);
		}
		if (checkLoginType== "phone") {
			u = userService.findByPhoneNumberAndPassword(username, password);
			existsCheck = userService.findByPhoneNumber(username);
		}
		
		if(existsCheck == null) return ResponseEntity.badRequest().body("User does not exist");
		if(u == null) return ResponseEntity.badRequest().body("User login failed");
		
		else 
			u.setPassword("");
			return ResponseEntity.ok(u);
	}

	@GetMapping(path="/all")
	public Iterable<User> getAllUsers() {
		return userService.findAll();
	}

	@GetMapping(path="/{id}/favorites")
	public Set<Post> getFavoritePosts(@PathVariable Integer id) {
		User user = new User();
		user = userService.findById(id).orElse(null);
		if(user!=null)
			return user.getLikedPosts();
		return null;
	}
	
	@GetMapping(path="/{id}")//
	public ResponseEntity getUserFromId(@PathVariable Integer id) {
		System.out.println(id);

		User user = new User();
		user = userService.findById(id).orElse(null);
				if (user != null)
				return ResponseEntity.ok().body(user);
				else
				return ResponseEntity.badRequest().body("User does not exist");
		}
	
	@GetMapping(path="/{id}/favouritePosts")//
	public ResponseEntity getUserFavPosts(@PathVariable Integer id) {
		System.out.println(id);

		User user = new User();
		user = userService.findById(id).orElse(null);
				if (user != null) {
					System.out.println("start params \n\n\n\n");
					System.out.println(user.getLikedPosts());
					System.out.println("end params \n\n\n\n");
					return ResponseEntity.ok().body(user.getLikedPosts());
				}
				else {
				return ResponseEntity.badRequest().body("User does not exist");
				}
		}
	
	
	
}