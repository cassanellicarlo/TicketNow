package com.digitalgarage.ticketnow.repository;

import org.springframework.data.repository.CrudRepository;
import com.digitalgarage.ticketnow.model.Event;
import com.digitalgarage.ticketnow.service.EventService;

import org.springframework.stereotype.Component;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;



public interface EventRepository extends CrudRepository<Event,Integer>{

	Event findByEventName(String eventName);

	Event findByEventCity(String eventCity);

	Event findByEventNameAndEventDateAndEventCity(String eventName, String eventDate, String eventCity);
}