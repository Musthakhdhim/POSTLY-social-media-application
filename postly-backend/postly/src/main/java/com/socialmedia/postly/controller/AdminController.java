package com.socialmedia.postly.controller;

import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<Users>> findAllUsers(){
        List<Users> users=adminService.findAllUsers();

        return ResponseEntity.ok().body(users);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Users> getUserById(@PathVariable Long userId){
        Users user = adminService.findUserById(userId);

        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/block/{userId}")
    public ResponseEntity<Users> blockAndUnblock(@PathVariable Long userId){
        Users user = adminService.blockAndUnblockUserById(userId);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/twit/{twitId}")
    public ResponseEntity<Twit> findTwitByTwitId(@PathVariable Long twitId){
        Twit twit=adminService.findTwitById(twitId);

        return ResponseEntity.ok(twit);
    }

    @GetMapping("/twits/user/{userId}")
    public ResponseEntity<List<Twit>> findAllTwitsByUser(@PathVariable Long userId){
        List<Twit> twits=adminService.findAllTwitsByUserId(userId);

        return ResponseEntity.ok(twits);
    }
}
