package com.example.server.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "postcomment"
)
public class PostComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private CreatePost createPost;

    public PostComment() {
    }

    public PostComment( String content, User user, CreatePost createPost) {
        this.content = content;
        this.user = user;
        this.createPost = createPost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public CreatePost getCreatePost() {
        return createPost;
    }

    public void setCreatePost(CreatePost createPost) {
        this.createPost = createPost;
    }
}
