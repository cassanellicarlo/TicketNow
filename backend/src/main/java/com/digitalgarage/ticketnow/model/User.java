package com.digitalgarage.ticketnow.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ColumnDefault;

import javax.persistence.CascadeType;
import javax.persistence.Column;

import com.digitalgarage.ticketnow.model.Country;
import com.digitalgarage.ticketnow.service.UserService;
import com.digitalgarage.ticketnow.model.Artist;


@Entity
public class User {
	
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String username;
    
    private String email;
    
    private String name;
    
    private String surname;
    
    private String password;
    
    private String phoneNumber;
    
    private int age;
    
    private String work;

    private String spotify;

    //user_country_likes
	@ManyToMany (cascade= CascadeType.REMOVE)
	@JoinTable(
	  name = "user_country_likes", 
	  joinColumns = @JoinColumn(name = "id", referencedColumnName = "id"), 
	  inverseJoinColumns = @JoinColumn(name = "name", referencedColumnName = "name"))
		Set<Country> likedCountries;
	//
	//user_artists_likes
	@ManyToMany (cascade= CascadeType.REMOVE)
	@JoinTable(
	  name = "user_artists_likes", 
	  joinColumns = @JoinColumn(name = "id", referencedColumnName = "id"), 
	  inverseJoinColumns = @JoinColumn(name = "name", referencedColumnName = "name"))
		Set<Artist> likedArtists;
	
	//user_posts_likes
	@ManyToMany (cascade= CascadeType.REMOVE)
	@JoinTable(
	  name = "user_posts_likes", 
	  joinColumns = @JoinColumn(name = "id", referencedColumnName = "id"), 
	  inverseJoinColumns = @JoinColumn(name = "post_id", referencedColumnName = "id"))
		Set<Post> likedPosts;
	
	//1 user to N posts
	//fetch = FetchType.EAGER, 
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Post> posts;//
	
	
	/*
	public void addFavArtist(User user, Artist artist) {
		likedArtists.add(artist);
		UserService userService = new UserService();
		//likes.add(this); //boh
		userService.saveUser(user);
	} //TO DO, PAUSED FOR POST (PRIORITY)
	*/
	
	public void removeFavArtist(User user, Artist artist) {

	}
	
	/*private List<ClassB> fieldClassB; 

    public void addClassB(ClassB b) {
        fieldClassB.add(b);
        b.fieldClassA().add(this);
    }

    public void removeClassB(ClassB b) {
        fieldClassB.remove(b);
        b.fieldClassA().remove(this);
    }  
    */
	
	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	////costruttori
	public User() {
		
	}
	
	public User(String username) {
		super();
		this.username = username;
	}
    
	public User(String username, String email, String name, String surname, String password,
			String phoneNumber, int age, String work) {
		super();
		this.username = username;
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.age = age;
		this.work = work;
	}
	
	public User(String username, String email, String name, String surname, String password,
			String phoneNumber, int age, String work, Set<Country> likedCountries) {
		super();
		this.username = username;
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.age = age;
		this.work = work;
		this.setLikedCountries(likedCountries);
	}
	
	public User(String username, String email, String name, String surname, String password,
			String phoneNumber, int age, String work, Set<Country> likedCountries, Set<Artist> likedArtists) {
		super();
		this.username = username;
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.age = age;
		this.work = work;
		this.setLikedCountries(likedCountries);
		this.setLikedArtists(likedArtists);
	}
	
	public User(String username, String email, String name, String surname, String password,
			String phoneNumber, int age, Set<Post> likedPosts, String work) {
		super();
		this.username = username;
		this.email = email;
		this.name = name;
		this.surname = surname;
		this.password = password;
		this.phoneNumber = phoneNumber;
		this.age = age;
		this.work = work;
		this.setLikedPosts(likedPosts);
	}

	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getWork() {
		return work;
	}

	public void setWork(String work) {
		this.work = work;
	}


	public Set<Post> getPosts() {
		return posts;
	}

	public void setPosts(Set<Post> posts) {
		this.posts = posts;
	}

	
	public String getSpotify() {
		return spotify;
	}

	public void setSpotify(String spotify) {
		this.spotify = spotify;
	}

	public Set<Post> getLikedPosts() {
		return likedPosts;
	}

	public void setLikedPosts(Set<Post> likedPosts) {
		this.likedPosts = likedPosts;
	}
	
	public Set<Country> getLikedCountries() {
		return likedCountries;
	}

	public void setLikedCountries(Set<Country> likedCountries) {
		this.likedCountries = likedCountries;
	}

	public Set<Artist> getLikedArtists() {
		return likedArtists;
	}

	public void setLikedArtists(Set<Artist> likedArtists) {
		this.likedArtists = likedArtists;
	}
	
	

	public void addLikedPost(Post post){
		this.likedPosts.add(post);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [id=" + id + "]";
	}

}
