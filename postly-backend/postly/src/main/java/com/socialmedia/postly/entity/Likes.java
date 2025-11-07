package com.socialmedia.postly.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Users user;

    @ManyToOne
    private Twit twit;
}
