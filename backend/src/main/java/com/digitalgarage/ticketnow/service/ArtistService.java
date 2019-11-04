package com.digitalgarage.ticketnow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalgarage.ticketnow.model.Artist;
import com.digitalgarage.ticketnow.repository.ArtistRepository;

@Service
public class ArtistService {
	@Autowired
	private ArtistRepository artistRepository;
	
	public Artist findByName(String name) {
		return artistRepository.findByName(name);
	}
	
	public void saveArtist(Artist artist) {
		artistRepository.save(artist);
	}
	
	// inserimento iniziale 
	public String mockArtists() {
		Artist artist1 = new Artist("Florence and the Machine");
		Artist artist2 = new Artist("Sfera Ebbasta");
		Artist artist3 = new Artist("Eminem");
		Artist artist4 = new Artist("The Beatles");
		Artist artist5 = new Artist("Jovanotti");
		
		Artist ArtistCheck_ini = this.findByName(artist1.getName() );
		if(ArtistCheck_ini != null) {
		return "The artists are already in the DB\n";
		}
		else {
			this.saveArtist(artist1);
			this.saveArtist(artist2);
			this.saveArtist(artist3);
			this.saveArtist(artist4);
			this.saveArtist(artist5);

			return "Mock artist successful";
		}

}

	public Iterable<Artist> findAll() {
		return artistRepository.findAll();
	}


}
