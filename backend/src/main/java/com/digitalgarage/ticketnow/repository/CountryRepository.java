package com.digitalgarage.ticketnow.repository;

import org.springframework.data.repository.CrudRepository;
import com.digitalgarage.ticketnow.model.Country;

	public interface CountryRepository extends CrudRepository<Country,Integer>{

		Country findByName(String name);
		

}
