package com.socialmedia.postly.service;

import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.exception.UsersNotFoundException;

import java.util.List;

public interface UserService {

    public Users findUserById(Long userId) throws UsersNotFoundException;

    public Users findUserProfileByJwt(String jwt) throws UsersNotFoundException;

    public Users updateUser(Long userId, Users user) throws UsersNotFoundException;

    public Users followUser(Long userId, Users user) throws UsersNotFoundException;

    public List<Users> searchUser(String keyword);

}
