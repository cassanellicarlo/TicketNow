package com.digitalgarage.ticketnow.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import java.util.Set;



@Entity
public class Country {
    @Id
    private String name;
 
    @ManyToMany(mappedBy = "likedCountries")
    Set<User>  likes;


public Country () {
	
}

public Country (String name) {
	super();
	this.name=name;
}

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}


}