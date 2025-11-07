package com.socialmedia.postly.dtos;

import lombok.Data;
import org.springframework.http.ResponseCookie;

@Data
public class AuthenticationResult {

    private ResponseCookie jwtCookie;
    private UserInfoResponse response;

    public AuthenticationResult() {
    }

    public AuthenticationResult(ResponseCookie jwtCookie, UserInfoResponse response) {
        this.jwtCookie = jwtCookie;
        this.response = response;
    }
}