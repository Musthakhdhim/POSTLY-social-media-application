package com.socialmedia.postly.exception;

public class WrongVerificationCodeException extends RuntimeException{
    public WrongVerificationCodeException(String message) {
        super(message);
    }
}
