package com.digitalgarage.ticketnow.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalgarage.ticketnow.model.Post;
import com.digitalgarage.ticketnow.repository.PostRepository;

@Service
public class PostService {
	@Autowired
	private PostRepository postRepository;
	
	public void savePost(Post post) {
		postRepository.save(post);
	}

	public Iterable<Post> findAll() {
		return postRepository.findAll();
	}
	
	public Optional<Post> findById(int id) {
		return postRepository.findById(id);
	}
	
	
	/*
	// inserimento iniziale 
		public String mockPosts() {
			User user1= new User("testMockPost");
			user1.setId(6);
			System.out.println("provo a salvare user: INIZIO \n\n\n\n\n\n\n\n\n\n\n\n\n\n");

			
			Post post1 = new Post("Biglietti Florence",
					"Vendo biglietti per il concerto dei Florence and the Machine a Milano il giorno X X e X",
					"30",
					user1);

			System.out.println(user1.getId());
			System.out.println(post1.getId());
			System.out.println("pre SAVE \n\n\n\n\n\n\n\n\n\n\n\n\n\n");

			this.savePost(post1);
			return "tutto ok MOCKPOSTS \n\n\n\n";
	
		}
		*/
		
}
