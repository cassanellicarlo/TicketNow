package com.digitalgarage.ticketnow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalgarage.ticketnow.model.Country;
import com.digitalgarage.ticketnow.repository.CountryRepository;


@Service
public class CountryService {

	@Autowired
	private CountryRepository countryRepository;
	
	public Country findByName(String name) {
		return countryRepository.findByName(name);
	}
	
	public void saveCountry(Country country) { 
		countryRepository.save(country);
	}

	
	
	// inserimento iniziale 
		public String mockCountries() {
			Country country1 = new Country("Milano");
			Country country2 = new Country("Cesano");
			Country country3 = new Country("Napoli");
			Country country4 = new Country("Amsterdam");
			Country country5 = new Country("Bruxelles");
			Country country6 = new Country("Madrid");
			Country country7 = new Country("Torino");
			
			Country country8 = new Country ("Ginevra");
			Country country9 = new Country ("Torino");
			Country country10 = new Country ("Parigi");
			
			
			Country CountryCheck_ini = this.findByName(country1.getName() );
			if(CountryCheck_ini != null) {
			return "The countries are already in the DB\n";
			}
			else {
				this.saveCountry(country1);
				this.saveCountry(country2);
				this.saveCountry(country3);
				this.saveCountry(country4);//
				this.saveCountry(country5);
				this.saveCountry(country6);
				this.saveCountry(country7);
				this.saveCountry(country8);
				this.saveCountry(country9);
				this.saveCountry(country10);
				return "Mock country successful";
			}

	}

		public Iterable<Country> findAll() {
			return countryRepository.findAll();

		}




}
