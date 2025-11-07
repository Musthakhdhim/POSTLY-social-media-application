package com.socialmedia.postly.service;

import com.socialmedia.postly.entity.Likes;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.exception.TwitNotFoundException;
import com.socialmedia.postly.exception.UsersNotFoundException;

import java.util.List;

public interface LikeService {

    public Likes likeTwit(Long twitId, Users user) throws UsersNotFoundException, TwitNotFoundException;

    public List<Likes> getAllLikes(Long twitId) throws TwitNotFoundException;

}
