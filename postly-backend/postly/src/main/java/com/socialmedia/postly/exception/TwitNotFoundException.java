package com.socialmedia.postly.exception;

public class TwitNotFoundException extends RuntimeException{
    public TwitNotFoundException(String message) {
        super(message);
    }
}
