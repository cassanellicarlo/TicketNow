package com.digitalgarage.ticketnow.service;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.beans.factory.annotation.Autowired;

import com.digitalgarage.ticketnow.model.Event;
import com.digitalgarage.ticketnow.repository.EventRepository;

@Service
public class EventService {

	@Autowired
	private EventRepository eventRepository;

	
	public void saveEvent(Event event) {
		eventRepository.save(event);
	}

	public Event findByEventName(String eventName) {
		return eventRepository.findByEventName(eventName);
	}
	
	public Event findByEventCity(String eventCity) {
		return eventRepository.findByEventCity(eventCity);
	}

	public Iterable<Event> findAll() {
		return eventRepository.findAll();
	}

	public Event findByEventNameAndEventDateAndEventCity(String eventName, String eventDate, String eventCity) {
		return eventRepository.findByEventNameAndEventDateAndEventCity(eventName, eventDate, eventCity);
	}
	
	
	// inserimento iniziale
	public String mockEvents() {
		Event event1 = new Event("Florence and the Machine Tour","Milano","2019-08-30","Florence and the Machine");
		Event event2 = new Event("Jova Beach Party 2019","Milano","2019-09-21","Jovanotti");
		//add more//

		
		Event eventCheck_ini = this.findByEventNameAndEventDateAndEventCity(event1.getEventName(), event1.getEventDate(), event1.getEventCity() );
		
		if(eventCheck_ini != null) {
		return "The events are already in the DB";
		}
		else {
			this.saveEvent(event1);
			this.saveEvent(event2);
			return "Event mock successful";
		}
	}
	 
	
}
