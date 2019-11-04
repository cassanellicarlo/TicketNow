package com.digitalgarage.ticketnow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.digitalgarage.ticketnow.service.EventService;

@SpringBootApplication
public class TicketnowApplication {

	public static void main(String[] args) {
		SpringApplication.run(TicketnowApplication.class, args); 
	}
	
}