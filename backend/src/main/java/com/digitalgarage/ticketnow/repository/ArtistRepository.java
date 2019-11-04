package com.digitalgarage.ticketnow.repository;

import org.springframework.data.repository.CrudRepository;
import com.digitalgarage.ticketnow.model.Artist;

public interface ArtistRepository extends CrudRepository<Artist,Integer>{
	
	Artist findByName (String name);
	
}
