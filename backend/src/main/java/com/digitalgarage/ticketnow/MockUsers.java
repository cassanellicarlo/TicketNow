package com.digitalgarage.ticketnow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.digitalgarage.ticketnow.service.UserService;

@Component
public class MockUsers implements CommandLineRunner {
	
	@Autowired
	private UserService userService;	
	
    @Override
    public void run(String...args) throws Exception {
       String result = userService.mockUsers();
       
       System.out.println(result);
    }
}
