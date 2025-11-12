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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * REST controller that exposes endpoints for creating, retrieving,
 * replying, retweeting and deleting "twits".
 *
 * <p>Endpoints are rooted at {@code /api/twits} and expect the application
 * to resolve the active user via a JWT stored in the request cookies using
 * {@link JwtUtils} and {@link UserService}.</p>
 */
@RestController
@RequestMapping("/api/twits")
@CrossOrigin("http://localhost:3000")
public class TwitController {

    /**
     * Service providing business logic for twit operations such as create,
     * reply, find, delete and retweet.
     */
    @Autowired
    private TwitService twitService;

    /**
     * Service used to resolve user profiles for the authenticated user.
     */
    @Autowired
    private UserService userService;

    /**
     * Utility for extracting JWTs from the request cookies and validating them.
     */
    @Autowired
    JwtUtils jwtUtils;

    /**
     * Create a new twit. Accepts multipart form data for optional image and video
     * files along with a Twit payload.
     *
     * @param req the Twit entity payload (text and metadata)
     * @param image optional image file uploaded with the twit
     * @param video optional video file uploaded with the twit
     * @param request the current HTTP servlet request (used to read JWT cookie)
     * @return a ResponseEntity containing the created {@link TwitDto} and HTTP status {@code 201 CREATED}
     * @throws IOException when file handling (image/video) fails
     */
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TwitDto> createTwit(@RequestPart Twit req,
                                              @RequestPart(required = false) MultipartFile image,
                                              @RequestPart(required = false) MultipartFile video,
                                              HttpServletRequest request) throws IOException {

//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        Twit twit=twitService.createTwit(req, image, video, user);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    /**
     * Serve an image file previously uploaded for a twit.
     *
     * @param filename the filename of the image to return (relative to the `images` directory)
     * @return a ResponseEntity with the image resource and appropriate content type, or {@code 404 NOT FOUND}
     * @throws IOException if probing the file's content type or reading the file fails
     */
//    @GetMapping(value="/image/{filename}" , produces = MediaType.IMAGE_JPEG_VALUE)
//    public ResponseEntity<Resource> getImage(@PathVariable String filename) throws IOException {
//        Path imagePath = Paths.get("images", filename);
//
//        if (!Files.exists(imagePath)) {
//            return ResponseEntity.notFound().build();
//        }
//
//        Resource resource = new UrlResource(imagePath.toUri());
//        String contentType = Files.probeContentType(imagePath);
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(contentType))
//                .body(resource);
//    }

    /**
     * Create a reply to an existing twit. Accepts a TwitReplyRequest and an optional image.
     *
     * @param req the reply request payload containing parent twit id and text
     * @param image optional image file attached to the reply
     * @param request the current HTTP servlet request (used to read JWT cookie)
     * @return a ResponseEntity containing the created reply {@link TwitDto} and HTTP status {@code 201 CREATED}
     * @throws IOException when file handling fails
     */
    @PostMapping(value = "/reply", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TwitDto> replyTwit(@RequestPart TwitReplyRequest req,
                                             @RequestPart(required = false) MultipartFile image,
                                             HttpServletRequest request) throws IOException {

//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        Twit twit=twitService.createReply(req, image, user);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }

    /**
     * Retweet (repost) an existing twit on behalf of the authenticated user.
     *
     * @param twitId the id of the twit to retweet
     * @param request the current HTTP servlet request (used to read JWT cookie)
     * @return a ResponseEntity containing the updated {@link TwitDto} and HTTP status {@code 200 OK}
     */
    @PutMapping("/{twitId}/retweet")
    public ResponseEntity<TwitDto> reTwit(@PathVariable Long twitId, HttpServletRequest request){

//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        Twit twit=twitService.retwit(twitId, user);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    /**
     * Retrieve a twit by its id and map it to a DTO for the authenticated user.
     *
     * @param twitId id of the twit to retrieve
     * @param request the current HTTP servlet request (used to read JWT cookie)
     * @return a ResponseEntity containing the found {@link TwitDto} and HTTP status {@code 200 OK}
     */
    @GetMapping("/{twitId}")
    public ResponseEntity<TwitDto> findTwitById(@PathVariable Long twitId, HttpServletRequest request){

//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        Twit twit=twitService.findById(twitId);

        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    /**
     * Delete a twit owned by the authenticated user.
     *
     * @param twitId id of the twit to delete
     * @param request the current HTTP servlet request (used to read JWT cookie)
     * @return a ResponseEntity containing an {@link ApiResponse} and HTTP status {@code 200 OK}
     */
    @DeleteMapping("/{twitId}")
    public ResponseEntity<ApiResponse> deleteTwit(@PathVariable Long twitId, HttpServletRequest request){

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        twitService.deleteTwitById(twitId, user.getUserId());

        ApiResponse response=new ApiResponse("twit deleted successfully", true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Retrieve all twits and map them to DTOs for the authenticated user.
     *
     * @param request the current HTTP servlet request (used to read JWT cookie)
     * @return a ResponseEntity containing a list of {@link TwitDto} and HTTP status {@code 200 OK}
     */
    @GetMapping("/")
    public ResponseEntity<List<TwitDto>> getAllTwits(HttpServletRequest request){

//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        List<Twit> twit=twitService.findAllTwit();

        List<TwitDto> twitDto= TwitDtoMapper.toTwitDtos(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    /**
     * Retrieve all twits for the specified user id. Note: this controller resolves the currently
     * authenticated user as context but the endpoint receives the target user's id as a path variable.
     *
     * @param userId id of the user whose twits should be returned
     * @param request the current HTTP servlet request (used to read JWT cookie)
     * @return a ResponseEntity containing a list of {@link TwitDto} and HTTP status {@code 200 OK}
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TwitDto>> getUsersAllTwits(@PathVariable Long userId,HttpServletRequest request){

//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        List<Twit> twit=twitService.getUserTwit(user);

        List<TwitDto> twitDto= TwitDtoMapper.toTwitDtos(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }

    /**
     * Retrieve twits liked by the authenticated user.
     *
     * @param userId path variable present in the route but not used to determine the authenticated user (the controller resolves the user from JWT)
     * @param request the current HTTP servlet request (used to read JWT cookie)
     * @return a ResponseEntity containing a list of {@link TwitDto} representing twits liked by the authenticated user and HTTP status {@code 200 OK}
     */
    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TwitDto>> findTwitByLikesByUser(@PathVariable Long userId,HttpServletRequest request){

//        String jwt=jwtUtils.getJwtFromCookies(request);
//        Users user = userService.findUserProfileByJwt(jwt);

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Users user=userService.findUserByUsername(username);

        List<Twit> twit=twitService.findByLikesContainsUser(user);

        List<TwitDto> twitDto= TwitDtoMapper.toTwitDtos(twit, user);

        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }
}
