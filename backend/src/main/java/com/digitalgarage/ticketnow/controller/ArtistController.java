package com.digitalgarage.ticketnow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalgarage.ticketnow.model.Artist;
import com.digitalgarage.ticketnow.service.ArtistService;


@RestController
@CrossOrigin
@RequestMapping(path="/api/artists")
public class ArtistController {
	
	@Autowired
	private ArtistService artistService;

	@GetMapping(path="/all")
	public Iterable<Artist> getAllArtists() {
		return artistService.findAll();
	}
	
	@PostMapping(path="/add")
		public ResponseEntity addNewArtist(@RequestBody Artist artist) {
			
			Artist artistCheck = artistService.findByName(artist.getName());
			
			if(artistCheck != null) return ResponseEntity.badRequest().body("Artist already in DB");
			
			else {
				artistService.saveArtist(artist);
				return ResponseEntity.ok(artist);
			}
		}
	
	}
	

