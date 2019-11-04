package com.digitalgarage.ticketnow.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalgarage.ticketnow.model.Country;
import com.digitalgarage.ticketnow.service.CountryService;

@RestController
@CrossOrigin
@RequestMapping(path="/api/countries")
public class CountryController {
	@Autowired
	private CountryService countryService;
	
	@GetMapping(path="/all")
	public Iterable<Country> getAllCountries() {
		return countryService.findAll();
	}
	
	// USER REGISTRATION
	@PostMapping(path="/add")
	public ResponseEntity addNewCountry(@RequestBody Country country) {
				
		Country countryCheck = countryService.findByName(country.getName());
		
		if(countryCheck != null) return ResponseEntity.badRequest().body("Country already in DB");
		
		else {
			countryService.saveCountry(country);
			return ResponseEntity.ok(country);
		}	
		
	}

}
