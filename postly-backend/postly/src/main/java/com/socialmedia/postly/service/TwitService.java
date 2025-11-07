package com.socialmedia.postly.service;

import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.TwitReplyRequest;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.exception.TwitNotFoundException;
import com.socialmedia.postly.exception.UsersNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface TwitService {

//    public Twit createTwit(Twit twit, Users user);
    public Twit createTwit(Twit twit, MultipartFile image,MultipartFile video,  Users user) throws IOException;


    public List<Twit> findAllTwit();

    public Twit retwit(Long twitId, Users user) throws UsersNotFoundException, TwitNotFoundException;

    public Twit findById(Long twitId) throws TwitNotFoundException;

    public void deleteTwitById(Long twitId, Long userId) throws TwitNotFoundException, UsersNotFoundException;

    public Twit removeFromRetwit(Long twitId, Users user) throws UsersNotFoundException, TwitNotFoundException;

    public Twit createReply(TwitReplyRequest request, MultipartFile image,Users user) throws TwitNotFoundException,IOException;

    public List<Twit> getUserTwit(Users user);

    public List<Twit> findByLikesContainsUser(Users user);

}
