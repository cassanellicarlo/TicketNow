package com.digitalgarage.ticketnow.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.GetMapping;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    
    @NotNull(message = "Title may not be null")
    private String title;
    @NotNull(message = "Text may not be null")
    private String text;
    @NotNull(message = "Price may not be null")
    private String price;
	@NotNull(message = "Owner may not be null")
	private String owner;
    
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn
    @JsonIgnore
    private User user;
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<Comment> comments;
	
	@Transient
	private int userId;
	
	public int getUserId() {
		return user.getId();
	}
	
    public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}

    @JsonIgnore
	@ManyToMany(mappedBy = "likedPosts")
    Set<User>  likes;


    
    //getters and setters
	public Integer getid() {
		return id;
	}

	public void setid(Integer id) {
		this.id = id;
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void addFavorites(User user){
	    this.likes.add(user);
    }

	public Set<User> getLikes() {
		return this.likes;
	}

	@Override
	public String toString() {
		return "Post [id=" + id + "]";
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
		Post other = (Post) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	//costruttori
	public Post() {
    	
    }
	
	public void addComment(Comment comment) {
		this.comments.add(comment);
	}
	
}

