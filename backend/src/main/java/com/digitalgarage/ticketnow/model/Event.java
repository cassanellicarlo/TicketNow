package com.digitalgarage.ticketnow.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;



@Entity @IdClass(EventId.class)
public class Event {
	
	@Id private String eventName;
	@Id private String eventCity;
	@Id private String eventDate;
	
	private String eventMainArtist;
	
	public Event() {
		
	}
		
	public Event(String eventName, String eventCity, String eventDate, String eventMainArtist) {
		super();
		this.eventName = eventName;
		this.eventCity = eventCity;
		this.eventDate = eventDate;
		this.eventMainArtist = eventMainArtist;
	}
	
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
	}
	public String getEventMainArtist() {
		return eventMainArtist;
	}
	public void setEventMainArtist(String eventMainArtist) {
		this.eventMainArtist = eventMainArtist;
	}
	public String getEventCity() {
		return eventCity;
	}
	public void setEventCity(String eventCity) {
		this.eventCity = eventCity;
	}
	public String getEventDate() {
		return eventDate;
	}
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}


	
}
