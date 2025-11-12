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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller responsible for like-related operations such as liking a twit and listing likes.
 *
 * Root path is /api.
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:3000")
public class LikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @Autowired
    JwtUtils jwtUtils;

    /**
     * Like a twit on behalf of the authenticated user.
     *
     * The authenticated user is resolved from the JWT cookie in the request.
     *
     * @param twitId id of the twit to be liked
     * @param request HttpServletRequest used to extract JWT cookie
     * @return ResponseEntity with the created LikeDto and HTTP 201 status
     */
    @PostMapping("/{twitId}/likes")
    public ResponseEntity<LikeDto> likeTwit(@PathVariable Long twitId, HttpServletRequest request){
//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        Likes likes = likeService.likeTwit(twitId,user );

        LikeDto likeDto= LikeDtoMapper.toLikeDto(likes, user);

        return new ResponseEntity<>(likeDto, HttpStatus.CREATED);
    }


    /**
     * Get all likes for a given twit. The requester is resolved from the JWT cookie to
     * help map likes relative to the requesting user (e.g., to mark whether they liked).
     *
     * @param twitId id of the twit whose likes should be retrieved
     * @param request HttpServletRequest used to extract JWT cookie
     * @return ResponseEntity with a list of LikeDto entries and HTTP 201 status
     */
    @PostMapping("/twit/{twitId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long twitId, HttpServletRequest request){
        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        List<Likes> likes = likeService.getAllLikes(twitId);

        List<LikeDto> likeDtos= LikeDtoMapper.toLikeDtos(likes, user);

        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }



}
