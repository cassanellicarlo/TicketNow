package com.digitalgarage.ticketnow.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.digitalgarage.ticketnow.model.User;

public interface UserRepository extends CrudRepository<User,Integer>{
	
	User findByEmailOrUsernameOrPhoneNumber(String email, String username, String phoneNumber);

	User findByUsername(String username);

	User findByEmailOrPhoneNumber(String email, String phoneNumber);
	
	User findByUsernameAndPassword(String username, String password);

	User findByEmailAndPassword(String username, String password);

	User findByPhoneNumberAndPassword(String username, String password);

	User findByEmail(String username);

	User findByPhoneNumber(String username);

}
