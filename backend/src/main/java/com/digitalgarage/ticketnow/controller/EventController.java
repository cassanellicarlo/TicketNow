package com.digitalgarage.ticketnow.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.digitalgarage.ticketnow.model.Event;
import com.digitalgarage.ticketnow.service.EventService;

@RestController
@CrossOrigin
@RequestMapping(path="/api/events")
public class EventController {

	@Autowired
	private EventService eventService;	
	
	// EVENT INSERT FROM POST
	@PostMapping(path="/add")
	
	public ResponseEntity addNewEvent(@RequestBody Event event) {
		Event eventCheck = eventService.findByEventNameAndEventDateAndEventCity(event.getEventName(), event.getEventDate(), event.getEventCity() );
		if(eventCheck != null) {
		System.out.println("riga da inserire: " + event.getEventName() + " " + event.getEventDate() + " " +event.getEventCity() + "\n\n\n");
		return ResponseEntity.badRequest().body("The event is already in the DB");
		}
		else {
		    eventService.saveEvent(event);
			return ResponseEntity.ok(event);
		}
	}
	
	
	@GetMapping(path="/all")
	public Iterable<Event> getAllEvents() {
		return eventService.findAll();
	}	
}