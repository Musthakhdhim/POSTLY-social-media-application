package com.socialmedia.postly.dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UserDto {

    private Long userId;
    private String fullName;
    private String email;
    private String image;
    private String DOB;
    private String phoneNumber;
    private String backgroundImage;
    private String bio;
    private String username;

    private boolean req_user;
//    private boolean login_with_google;

    private List<UserDto> followers=new ArrayList<>();
    private List<UserDto> following=new ArrayList<>();

    private boolean followed;

    private boolean isVerified;
}
