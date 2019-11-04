package com.digitalgarage.ticketnow.model;


import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer comment_id;
    
    private String text;
    
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn
    @JsonIgnore
    private User user;
	
	@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "post_id")
	@JsonIgnore
    private Post post;
	
	@Transient
	private String username;
	
	
	public String getUsername(){
		return user.getUsername();
	}

	public Integer getComment_id() {
		return comment_id;
	}

	public void setComment_id(Integer comment_id) {
		this.comment_id = comment_id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	
    
    
}
