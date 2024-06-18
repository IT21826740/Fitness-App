package com.example.server.entity;

import java.time.Instant;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Workout {

    @Id
   @GeneratedValue
   private Integer id;

   private String name;

   private String part;
   
   private Integer rept;

   private Integer intervalTime;

   private Integer st;

   private Integer authId;

   private String description;

   private Instant timestamp;

   private String username;

   public void setId(int id) {
      this.id = id;
   }
}
