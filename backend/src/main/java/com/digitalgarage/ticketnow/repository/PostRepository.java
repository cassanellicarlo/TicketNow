package com.digitalgarage.ticketnow.repository;

import org.springframework.data.repository.CrudRepository;
import com.digitalgarage.ticketnow.model.Post;

public interface PostRepository extends CrudRepository<Post,Integer>{
	Post findByTitle(String title);
}
