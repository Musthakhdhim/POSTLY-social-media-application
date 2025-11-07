package com.socialmedia.postly.service;

import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.Users;

import java.util.List;

public interface AdminService {

    public List<Users> findAllUsers();

    public Users findUserById(Long userId);

    public Users blockAndUnblockUserById(Long userId);

    public Twit findTwitById(Long twitId);

    public List<Twit> findAllTwitsByUserId(Long userId);

}
