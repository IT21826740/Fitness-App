package com.example.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "likepost",
       uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id","post_id"})
    }

)
public class LikePost {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private CreatePost post;


    public LikePost() {
    }


    public LikePost(User user, CreatePost createPost) {
        this.user = user;
        this.post = createPost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CreatePost getCreatePost() {
        return post;
    }

    public void setCreatePost(CreatePost createPost) {
        this.post = createPost;
    }
}
