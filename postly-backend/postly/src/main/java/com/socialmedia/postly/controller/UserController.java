package com.socialmedia.postly.controller;

import com.socialmedia.postly.dtos.UserDto;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.jwt.JwtUtils;
import com.socialmedia.postly.mapper.UserDtoMapper;
import com.socialmedia.postly.service.UserService;
import com.socialmedia.postly.util.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        UserDto userDto= UserDtoMapper.toUserDto(user);
        userDto.setReq_user(true);

        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED) ;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId, HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users reqUser = userService.findUserProfileByJwt(jwt);

        Users user = userService.findUserById(userId);

        UserDto userDto= UserDtoMapper.toUserDto(user);
        userDto.setReq_user(UserUtil.isReqUser(reqUser, user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser,user));

        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED) ;
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(@RequestParam String keyword, HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users reqUser = userService.findUserProfileByJwt(jwt);

        List<Users> users = userService.searchUser(keyword);

        List<UserDto> userDtos= UserDtoMapper.toUserDtos(users);

        return new ResponseEntity<>(userDtos, HttpStatus.ACCEPTED) ;
    }

    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody Users req, HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users reqUser = userService.findUserProfileByJwt(jwt);

        System.out.println(req.getDOB());
        Users user = userService.updateUser(reqUser.getUserId(), req);

        UserDto userDto= UserDtoMapper.toUserDto(user);

        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED) ;
    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> updateUser(@PathVariable Long userId, HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users reqUser = userService.findUserProfileByJwt(jwt);

        Users user = userService.followUser(userId, reqUser);

        UserDto userDto= UserDtoMapper.toUserDto(user);

        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser, user));
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED) ;
    }

}
