package com.socialmedia.postly.dtos;

import lombok.Data;

@Data
public class LikeDto {
    private Long id;
    private UserDto user;
    private TwitDto twitId;
}
