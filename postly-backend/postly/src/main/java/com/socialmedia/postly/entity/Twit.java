package com.socialmedia.postly.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Twit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long twitId;

    @ManyToOne
    private Users user;

    private String content;

    @OneToMany(mappedBy = "twit", cascade = CascadeType.ALL)
    private List<Likes> likes=new ArrayList<>();

    @OneToMany
    private List<Twit> replyTwits= new ArrayList<>();

    @ManyToMany
    private List<Users> retwitUser = new ArrayList<>();

    @ManyToOne
    private Twit replyFor;

    private String image;
    private String video;

    private boolean isReply;
    private boolean isTwit;

    private LocalDateTime createdAt;

}
