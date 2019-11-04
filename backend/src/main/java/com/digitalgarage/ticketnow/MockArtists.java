package com.digitalgarage.ticketnow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.digitalgarage.ticketnow.service.ArtistService;
import com.digitalgarage.ticketnow.service.CountryService;

@Component
public class MockArtists implements CommandLineRunner{

	@Autowired
	private ArtistService artistService;
	
    @Override
    public void run(String...args) throws Exception {
        String result = artistService.mockArtists();//
       
       System.out.println(result);
    }
	
	
}
