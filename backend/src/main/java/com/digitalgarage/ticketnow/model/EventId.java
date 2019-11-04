package com.digitalgarage.ticketnow.model;

import java.io.Serializable;
import javax.persistence.Id;

public class EventId implements Serializable {
	 private String eventName;
	 private String eventCity; //city su TM
	 private String eventDate;
	 
	public String getEventName() {
		return eventName;
	}
	public void setEventName(String eventName) {
		this.eventName = eventName;
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