package com.socialmedia.postly.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class VerifyUserDto {
    private String email;
    private String verificationCode;
}