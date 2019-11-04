package com.digitalgarage.ticketnow.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

@Entity
public class Artist {
    @Id
    private String name;
    
    @ManyToMany(mappedBy = "likedArtists")
    Set<User>  likes;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Artist() {
		
	}
	
	public Artist(String name){
		this.name=name;
	}
	
}

