package com.digitalgarage.ticketnow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.digitalgarage.ticketnow.service.EventService;

@Component
public class MockEvents implements CommandLineRunner {
	
	@Autowired
	private EventService eventService;
	
    @Override
    public void run(String...args) throws Exception {
        String result = eventService.mockEvents();
       
       System.out.println(result);
    }
}
