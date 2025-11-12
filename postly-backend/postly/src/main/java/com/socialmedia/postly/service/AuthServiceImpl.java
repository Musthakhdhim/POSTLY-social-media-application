package com.socialmedia.postly.service;

import com.socialmedia.postly.dtos.*;
import com.socialmedia.postly.entity.AppRole;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.exception.*;
import com.socialmedia.postly.jwt.JwtUtils;
import com.socialmedia.postly.repository.UsersRepository;
import com.socialmedia.postly.security.UserDetailsImpl;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AuthServiceImpl implements AuthService{

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    EmailService emailService;

    public ResponseEntity<?> register(SignupRequest signupRequest) {

        if(usersRepository.existsByEmail(signupRequest.getEmail())) {
            throw new RuntimeException("Email is already in registered with another account!");
        }

        if(usersRepository.existsByUsername(signupRequest.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        Users user = modelMapper.map(signupRequest, Users.class);

        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
//        user.setRoles(Collections.singleton(AppRole.USER));

        user.setVerificationCode(generateVerificationCode());
        user.setVerificationCodeExpireAt(LocalDateTime.now().plusMinutes(5));
        Set<AppRole> roles = new HashSet<>();
        roles.add(AppRole.USER);
        user.setRoles(roles);

        user.setAccountEnabled(false);

        sendVerificationEmail(user);

        usersRepository.save(user);

        return new ResponseEntity<>("user registered successfully!", HttpStatus.OK);
    }

    public AuthenticationResult login(LoginRequest loginRequest){

        Users users = usersRepository.findByUsername(loginRequest.getUsername()).orElseThrow(
                ()->new UsersNotFoundException("user not found")
        );

        if(users.isAccountLocked()){
            throw new AccountLockedException("your account has been locked by administrator");
        }

        if(!users.isAccountEnabled()){
            log.error("Login failed - account not verified for {}", users.getEmail());
            throw new AccountNotVerifiedException("account is not yet verified, please verify your account");
        }

        if(passwordEncoder.matches(loginRequest.getPassword(), users.getPassword())){
            log.info("User {} provided correct password", users.getEmail());
        }
        else{
            log.error("Login failed - incorrect password for {}", users.getEmail());
            throw new BadCredentialsException("incorrect password, please try again");
        }

        Authentication authentication =authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails =(UserDetailsImpl) authentication.getPrincipal();

        // Generate JWT cookie
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails.getUsername());

        // Build user info response
        List<String> roles = userDetails.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .collect(Collectors.toList());

        UserInfoResponse userInfo = new UserInfoResponse(
                userDetails.getId(),
                userDetails.getUsername(),
                roles,
                jwtCookie.getValue() //before it was null ,for frontend== purpose token is stored in cookie
        );

        return new AuthenticationResult(jwtCookie, userInfo);

//        return ResponseEntity
//                .status(HttpStatus.ACCEPTED)
//                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
//                .body(new AuthenticationResult(jwtCookie, userInfo));


    }

    public void verifyUser(VerifyUserDto dto) {
        log.info("Verifying user with email: {}", dto.getEmail());

        Optional<Users> optionalUsers = usersRepository.findByEmail(dto.getEmail());
        System.out.println(optionalUsers);
        if (optionalUsers.isPresent()) {
            Users user = optionalUsers.get();
            if (user.getVerificationCodeExpireAt().isBefore(LocalDateTime.now())) {
                log.error("Verification failed - code expired for {}", dto.getEmail());
                throw new VerificationCodeExpiredException("verification code has expired, try resending the code");
            }
            else if (user.getVerificationCode().equals(dto.getVerificationCode())) {
                user.setAccountEnabled(true);


                user.setVerificationCode(null);
                user.setVerificationCodeExpireAt(null);
                usersRepository.save(user);
                log.info("User {} verified successfully", dto.getEmail());
            } else {
                log.error("Verification failed - wrong code for {}", dto.getEmail());
                throw new WrongVerificationCodeException("your verification code is incorrect, try again");
            }
        } else {
            log.error("Verification failed - user not found: {}", dto.getEmail());
            throw new UsersNotFoundException("user not found");
        }
    }

    public void resendVerificationCode(String email){
        log.info("Resending verification code to {}", email);

        Optional<Users> optionalUsers=usersRepository.findByEmail(email);
        if(optionalUsers.isPresent()){
            Users user=optionalUsers.get();

            if(user.isAccountEnabled()){
                log.warn("Resend failed - user {} already verified", email);
                throw new AlreadyVerifiedException("user already verified");
            }

            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpireAt(LocalDateTime.now().plusMinutes(15));
            log.debug("New verification code {} generated for {}", user.getVerificationCode(), email);

            sendVerificationEmail(user);
            usersRepository.save(user);
            log.info("Verification code resent to {}", email);
        }
        else{
            log.error("Resend failed - user not found: {}", email);
            throw new UsersNotFoundException("user not found");
        }
    }

    @Override
    public ResponseCookie logoutUser() {
        return jwtUtils.getCleanJwtCookie(); // clear cookie
    }

    @Override
    public UserInfoResponse getCurrentUserDetails(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(auth -> auth.getAuthority())
                .collect(Collectors.toList());

        return new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), roles, null);
    }

    private String generateVerificationCode() {
        Random random=new Random();
        int code=random.nextInt(900000)+100000;
        return String.valueOf(code);
    }

    public void sendVerificationEmail(Users user){
        log.info("Sending verification email to {}", user.getEmail());

        String subject="Email Verification Code";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to our app!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        emailService.sendEmail(user.getEmail(),subject, htmlMessage);
        log.info("Verification email sent to {}", user.getEmail());
    }
}
