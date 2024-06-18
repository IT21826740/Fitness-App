package com.example.server.entity;


import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table()
public class MealPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mealId;
    @Column(name="meal_plan")
    private String title;
    @Column(name="meal_description")
    private String description;
    @Column
    private String dietCategory;
    @Column
    private String scheduledDate;
    @Column(name = "image_path")
    private String imagePath;
    @Column(name = "Author_Id")
    private String authorId;
    @Column(name = "created_at")
    private Instant createdAt;
    
       @OneToMany(mappedBy = "mealPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> comments = new ArrayList<>();

    @OneToMany(mappedBy = "mealPlan", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Likes> likes = new ArrayList<>();

    public MealPlan() {

    }

    public MealPlan(String title, String description, String dietCategory, String scheduledDate, String imagePath, String authorId) {
        this.title = title;
        this.description = description;
        this.dietCategory = dietCategory;
        this.scheduledDate = scheduledDate;
        this.imagePath = imagePath;
        this.authorId = authorId;
    }


    public int getMealId() {
        return mealId;
    }
    public void setMealId(int mealId) {
        this.mealId = mealId;
    }
    public String getTitle() {
        return title;
    }
    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public void setTitle(String title) {
        this.title = title;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getDietCategory() {
        return dietCategory;
    }
    public void setDietCategory(String dietCategory) {
        this.dietCategory = dietCategory;
    }
    public String getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(String scheduledDate) {
        this.scheduledDate = scheduledDate;
    }
    
    @Override
    public String toString() {
        return "MealPlan{" +
                "mealId=" + mealId +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", dietCategory='" + dietCategory + '\'' +
                ", scheduledDate='" + scheduledDate + '\'' +
                ", imagePath='" + imagePath + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = Instant.now();
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }
    
    
}
