package com.socialmedia.postly.entity;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TwitReplyRequest {

    private String content;
    private Long twitId;
    private String image;
    private LocalDateTime createdAt;
}
