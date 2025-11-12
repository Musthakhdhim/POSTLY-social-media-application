package com.socialmedia.postly.controller;

import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller exposing administrative endpoints for managing users and twits.
 *
 * All endpoints are rooted at /api/admin and are intended for admin operations.
 */
@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
public class AdminController {

    @Autowired
    AdminService adminService;

    /**
     * Retrieve all users in the system.
     *
     * @return ResponseEntity containing a list of all Users
     */
    @GetMapping("/users")
    public ResponseEntity<List<Users>> findAllUsers(){
        List<Users> users=adminService.findAllUsers();

        return ResponseEntity.ok().body(users);
    }

    /**
     * Retrieve a single user by their id.
     *
     * @param userId id of the user to fetch
     * @return ResponseEntity containing the requested Users object
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Users> getUserById(@PathVariable Long userId){
        Users user = adminService.findUserById(userId);

        return ResponseEntity.ok(user);
    }

    /**
     * Block or unblock a user by toggling their blocked status.
     *
     * @param userId id of the user to block/unblock
     * @return ResponseEntity containing the updated Users object
     */
    @PutMapping("/user/block/{userId}")
    public ResponseEntity<Users> blockAndUnblock(@PathVariable Long userId){
        Users user = adminService.blockAndUnblockUserById(userId);

        return ResponseEntity.ok(user);
    }

    /**
     * Find a Twit by its id.
     *
     * @param twitId id of the twit to find
     * @return ResponseEntity containing the Twit
     */
    @GetMapping("/twit/{twitId}")
    public ResponseEntity<Twit> findTwitByTwitId(@PathVariable Long twitId){
        Twit twit=adminService.findTwitById(twitId);

        return ResponseEntity.ok(twit);
    }

    /**
     * Retrieve all twits authored by the specified user.
     *
     * @param userId id of the user whose twits should be retrieved
     * @return ResponseEntity containing a list of Twit objects
     */
    @GetMapping("/twits/user/{userId}")
    public ResponseEntity<List<Twit>> findAllTwitsByUser(@PathVariable Long userId){
        List<Twit> twits=adminService.findAllTwitsByUserId(userId);

        return ResponseEntity.ok(twits);
    }
}
