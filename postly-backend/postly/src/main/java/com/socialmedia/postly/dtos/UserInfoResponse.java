package com.socialmedia.postly.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserInfoResponse {

    private Long id;
    private String username;
    private List<String> roles;
    private String token; // JWT

}

