package com.example.server.entity;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "Create_Post")
public class CreatePost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    @Column(name = "caption")
    private String caption;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "Author_Id")
    private String authorId;

    @Column(name = "created_at")
    private Instant createdAt;

    public CreatePost() {
       
    }

    public CreatePost(String caption, String imagePath) {
        this.caption = caption;
        this.imagePath = imagePath;
    }


    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public String toString() {
        return "CreatePost [postId=" + postId + ", caption=" + caption + ", imagePath=" + imagePath + ", authorId="
                + authorId + ", createdAt=" + createdAt + "]";
    }
}
