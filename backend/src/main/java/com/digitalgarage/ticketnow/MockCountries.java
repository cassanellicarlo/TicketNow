package com.digitalgarage.ticketnow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.digitalgarage.ticketnow.service.CountryService;

@Component
public class MockCountries implements CommandLineRunner{
	
	@Autowired
	private CountryService contryService;
	
    @Override
    public void run(String...args) throws Exception {
        String result = contryService.mockCountries();
       
       System.out.println(result);
    }

}
