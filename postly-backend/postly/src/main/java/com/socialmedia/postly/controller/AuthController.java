package com.socialmedia.postly.controller;

import com.socialmedia.postly.dtos.LoginRequest;
import com.socialmedia.postly.dtos.SignupRequest;
import com.socialmedia.postly.dtos.VerifyUserDto;
import com.socialmedia.postly.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/hai")
    public String hello() {
        return "Hello from AuthController";
    }

    @GetMapping("/admin/hello")
    public String adminHello() {
        return "Hello Admin from AuthController";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignupRequest signupRequest) {
        // Registration logic will go here
        return authService.register(signupRequest);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        var res= authService.login(loginRequest);

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .header(HttpHeaders.SET_COOKIE, res.getJwtCookie().toString())
                .body(res.getResponse());
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyUser(@RequestBody VerifyUserDto verfiyUserDto){
        try{
            authService.verifyUser(verfiyUserDto);
            return ResponseEntity.ok("user verified successfully");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend")
    public ResponseEntity<?> resend(@RequestParam String email){
        try{
            authService.resendVerificationCode(email);
            return ResponseEntity.ok("resend successfully");
        }
        catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
