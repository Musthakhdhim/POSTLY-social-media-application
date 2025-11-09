package com.socialmedia.postly.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String fullName;

    private String username;
    private String email;
    private String password;

//    private boolean accountLocked;

    @Enumerated(EnumType.STRING)
    private Set<AppRole> roles = new HashSet<>();

    private boolean enabled;

    private String DOB;
    private String phoneNumber;

    private String image;

    private String backgroundImage;

    private String bio;

//    private String location;

    private boolean req_user;
    //private boolean login_with_google;

    private String verificationCode;
    @Column(name = "verification-expiration")
    private LocalDateTime verificationCodeExpireAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Twit> twit=new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Likes> likes=new ArrayList<>();

    @Embedded
    private Verification verification;

    private boolean isAccountEnabled;

    private boolean accountLocked=false;

    @JsonIgnore
    @ManyToMany
    private List<Users> followers = new ArrayList<>();

    @JsonIgnore
    @ManyToMany
    private List<Users> following = new ArrayList<>();


}
