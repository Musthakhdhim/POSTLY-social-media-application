package com.socialmedia.postly.controller;

import com.socialmedia.postly.dtos.TwitDto;
import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.TwitReplyRequest;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.jwt.JwtUtils;
import com.socialmedia.postly.mapper.TwitDtoMapper;
import com.socialmedia.postly.response.ApiResponse;
import com.socialmedia.postly.service.TwitService;
import com.socialmedia.postly.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/twits")
public class TwitController {

    @Autowired
    private TwitService twitService;

    @Autowired
    private UserService userService;

    @Autowired
    JwtUtils jwtUtils;

    //before
//    @PostMapping("/create")
//    public ResponseEntity<TwitDto> createTwit(@RequestBody Twit req, HttpServletRequest request){
//
//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);
//
//        Twit twit=twitService.createTwit(req, user);
//
//        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);
//
//        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
//    }

    //after mulipart file
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TwitDto> createTwit(@RequestPart Twit req,
                                              @RequestPart(required = false) MultipartFile image,
                                              @RequestPart(required = false) MultipartFile video,
                                              HttpServletRequest request) throws IOException {

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        Twit twit=twitService.createTwit(req, image, video, user);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    @GetMapping(value="/image/{filename}" , produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
        Path imagePath = Paths.get("images", filename);

        if (!Files.exists(imagePath)) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new UrlResource(imagePath.toUri());
        String contentType = Files.probeContentType(imagePath);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }


    @PostMapping(value = "/reply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TwitDto> replyTwit(@RequestPart TwitReplyRequest req,
                                             @RequestPart MultipartFile image,
                                             HttpServletRequest request) throws IOException {

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        Twit twit=twitService.createReply(req, image, user);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    @PutMapping("/{twitId}/retweet")
    public ResponseEntity<TwitDto> reTwit(@PathVariable Long twitId, HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        Twit twit=twitService.retwit(twitId, user);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @GetMapping("/{twitId}")
    public ResponseEntity<TwitDto> findTwitById(@PathVariable Long twitId, HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        Twit twit=twitService.findById(twitId);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @DeleteMapping("/{twitId}")
    public ResponseEntity<ApiResponse> deleteTwit(@PathVariable Long twitId, HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        twitService.deleteTwitById(twitId, user.getUserId());

        ApiResponse response=new ApiResponse("twit deleted successfully", true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/")
    public ResponseEntity<List<TwitDto>> getAllTwits(HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        List<Twit> twit=twitService.findAllTwit();

        List<TwitDto> twitDto= TwitDtoMapper.toTwitDtos(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TwitDto>> getUsersAllTwits(@PathVariable Long userId,HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        List<Twit> twit=twitService.getUserTwit(user);

        List<TwitDto> twitDto= TwitDtoMapper.toTwitDtos(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TwitDto>> findTwitByLikesByUser(@PathVariable Long userId,HttpServletRequest request){

        String jwt=jwtUtils.getJwtFromCookies(request);
        Users user = userService.findUserProfileByJwt(jwt);

        List<Twit> twit=twitService.findByLikesContainsUser(user);

        List<TwitDto> twitDto= TwitDtoMapper.toTwitDtos(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }
}
