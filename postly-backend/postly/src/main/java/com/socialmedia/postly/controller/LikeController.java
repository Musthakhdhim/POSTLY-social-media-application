package com.socialmedia.postly.controller;

import com.socialmedia.postly.dtos.LikeDto;
import com.socialmedia.postly.entity.Likes;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.jwt.JwtUtils;
import com.socialmedia.postly.mapper.LikeDtoMapper;
import com.socialmedia.postly.service.LikeService;
import com.socialmedia.postly.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/{twitId}/likes")
    public ResponseEntity<LikeDto> likeTwit(@PathVariable Long twitId, HttpServletRequest request){
        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        Likes likes = likeService.likeTwit(twitId,user );

        LikeDto likeDto= LikeDtoMapper.toLikeDto(likes, user);

        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }


    @PostMapping("/twit/{twitId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long twitId, HttpServletRequest request){
        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        List<Likes> likes = likeService.getAllLikes(twitId);

        List<LikeDto> likeDtos= LikeDtoMapper.toLikeDtos(likes, user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }



}
