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

/**
 * REST controller that exposes authentication-related endpoints such as signup, login,
 * verification and resending verification codes.
 *
 * Endpoints are rooted at /api/auth.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Simple health/hello endpoint for quick checks.
     *
     * @return a greeting string for the AuthController
     */
    @GetMapping("/hai")
    public String hello() {
        return "Hello from AuthController";
    }

    /**
     * Simple admin-specific hello endpoint.
     *
     * @return a greeting string for admin usage
     */
    @GetMapping("/admin/hello")
    public String adminHello() {
        return "Hello Admin from AuthController";
    }

    /**
     * Register a new user with the provided signup request payload.
     *
     * @param signupRequest DTO containing signup information (email, password, etc.)
     * @return ResponseEntity with registration outcome (delegated to AuthService)
     */
    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignupRequest signupRequest) {
        // Registration logic will go here
        return authService.register(signupRequest);
    }

    /**
     * Authenticate a user using supplied credentials and return a cookie with JWT.
     *
     * @param loginRequest DTO containing login credentials
     * @return ResponseEntity including a Set-Cookie header with JWT and a response body
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        var res= authService.login(loginRequest);

        return ResponseEntity
                .status(HttpStatus.ACCEPTED)
                .header(HttpHeaders.SET_COOKIE, res.getJwtCookie().toString())
                .body(res.getResponse());
    }

    /**
     * Verify a user using the supplied verification DTO (e.g., code or token).
     *
     * @param verfiyUserDto DTO containing verification information
     * @return ResponseEntity with success message or a bad request with error message
     */
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

    /**
     * Resend verification code/email to the provided email address.
     *
     * @param email the email address to which the verification code should be resent
     * @return ResponseEntity indicating success or failure
     */
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
