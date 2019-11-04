package com.digitalgarage.ticketnow.repository;
import org.springframework.data.repository.CrudRepository;

import com.digitalgarage.ticketnow.model.Comment;
import com.digitalgarage.ticketnow.model.User;
import com.digitalgarage.ticketnow.model.Post;

public interface CommentRepository extends CrudRepository<Comment,Integer>{
	Comment findByPostId(int id);
}
