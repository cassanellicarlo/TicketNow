package com.digitalgarage.ticketnow.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.digitalgarage.ticketnow.model.Artist;
import com.digitalgarage.ticketnow.model.Country;
import com.digitalgarage.ticketnow.model.User;
import com.digitalgarage.ticketnow.repository.UserRepository;

import java.lang.annotation.*;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	public User findByEmailOrUsernameOrPhoneNumber(String email, String username, String phoneNumber) {
		return userRepository.findByEmailOrUsernameOrPhoneNumber(email, username, phoneNumber);
	}
	
	public void saveUser(User user) {
		userRepository.save(user);
	}
	
	public User findByUsernameAndPassword(String username, String password) {
		return userRepository.findByUsernameAndPassword(username, password);
	}
	
	public Iterable<User> findAll(){
		return userRepository.findAll();
	}
	
	public User findByUserName(String username) {
		return userRepository.findByUsername(username);
	}

	public User findByEmailOrPhoneNumber(String email, String phoneNumber) {
		return userRepository.findByEmailOrPhoneNumber(email, phoneNumber);
	}
	
	
	public String checkLoginType(String username) {
		String response = null;
		if (checkLoginTypeUser(username)) response= "user";
		if (checkLoginTypeEmail(username)) response= "email";
		if (checkLoginTypePhone(username)) response= "phone";
	    System.out.println("risultato finale " + response);
	    return response;
	}


	public boolean checkLoginTypeEmail(String username) {
		int checkEmail = username.indexOf("@");
		if (checkEmail>3) {
			int checkEmailStep2 = username.indexOf(".");
			if (checkEmailStep2>checkEmail+3) {
				return true;
				}
		}
		return false;
	}
	

	public static boolean isNumeric(String strNum) {
	    return strNum.matches("-?\\d+(\\.\\d+)?");
	}

	
	public boolean checkLoginTypePhone(String username) {
	    //System.out.println("controllo se c'e' il +");
		//int checkPlus = username.indexOf("\\+");
	    //System.out.println("valore del check" + checkPlus);
		//if (checkPlus>-1) {
		if(isNumeric(username)) {
					return true;
			}
			return false;
		}
		
	public boolean checkLoginTypeUser(String username) {
					return true;
		}

	public User findByEmailAndPassword(String username, String password) {
		return userRepository.findByEmailAndPassword(username, password);
	}

	public User findByPhoneNumberAndPassword(String username, String password) {
		return userRepository.findByPhoneNumberAndPassword(username, password);
	}

	public User findByEmail(String username) {
		return userRepository.findByEmail(username);
	}

	public User findByUsername(String username) {
		return userRepository.findByUsername(username);

	}

	public User findByPhoneNumber(String username) {
		return userRepository.findByPhoneNumber(username);


	}
	
	public Optional<User> findById(int id) {
		return userRepository.findById(id);
	}
	
	

	
	// inserimento iniziale 
	public String mockUsers() {
		User user1 = new User("Giulia","giulia@test.com","Giulia","Salerno","abc", "5555", 23, "Graphic Designer");
		User user2 = new User("test","test@test.com","test","test","abc", "555", 101, "tester");
		
		Country country0 = new Country ("Milano");//NB: queste città devono essere già presenti nel DB
		Country country1 = new Country ("Ginevra");
		Country country2 = new Country ("Torino");
		Country country3 = new Country ("Amsterdam");
		Country country4 = new Country ("Parigi");
		Country country5 = new Country ("Bruxelles");
		
		Artist artist0 = new Artist("Florence and the Machine");
		Artist artist1 = new Artist("Jovanotti");
		
		User userCheck_ini = this.findByEmailOrUsernameOrPhoneNumber(user1.getEmail(), user1.getUsername(),
				user1.getPhoneNumber() );
		
		if(userCheck_ini != null) {
		return "The users are already in the DB\n";
		}
		else {
			//crea i Set per le country
			Set<Country> settcane1 = new HashSet<>();
			Set<Country> settcane2 = new HashSet<>();
			Set<Country> settcane3 = new HashSet<>();
			Set<Country> settcane4 = new HashSet<>();
			Set<Country> settcane5 = new HashSet<>();
			Set<Country> settcane6 = new HashSet<>();
			//crea i Set per gli artisti
			Set<Artist> settgatto1 = new HashSet<>();
			Set<Artist> settgatto2 = new HashSet<>();
			
			settcane1.add(country0);
			settcane2.add(country2);
			settcane3.add(country3);
			settcane4.add(country4);
			settcane5.add(country5);
			settcane6.add(country5);
			settcane6.add(country3);
			settcane6.add(country2);
			settcane6.add(country1);
			
			settgatto1.add(artist0);
			settgatto2.add(artist0);
			settgatto2.add(artist1);

			System.out.println("\n\n\n\n\n");
			User user3 = new User("Marco77","marcorossi@gmail.com","Marco","Rossi","abc", "34567", 26, "DJ", settcane1);
			User user4 = new User("Marco97","sferamylove@gmail.com","Marco","ebbasta","abc", "23123", 232, "padrino", settcane2);
			User user5 = new User("Fdr","12rossi@gmail.com","Geppetto","Rossi","abc", "11111", 11, "azzecca garbugli", settcane3);
			User user6 = new User("SalvoMuratore","peroni4life@gmail.com","Salvatore","Verdi","abc", "21111", 22, "muratore", settcane4);
			User user7 = new User("Lulu","jojo@gmail.com","Luana","Bianchi","abc", "222222", 17, "DJ", settcane5, settgatto2);
			User user8 = new User("SuzieQ","tutturu@gmail.com","Susanna","Q","abc", "12341", 30, "Vocalist", settcane6, settgatto1);


			this.saveUser(user1);
			this.saveUser(user2);
			this.saveUser(user3);
			this.saveUser(user4);
			this.saveUser(user5);
			this.saveUser(user6);
			this.saveUser(user7);
			this.saveUser(user8);
			return "mock user successful\n";
		}
	}

	

}
