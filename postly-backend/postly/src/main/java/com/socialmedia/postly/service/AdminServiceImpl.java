package com.socialmedia.postly.service;

import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.exception.TwitNotFoundException;
import com.socialmedia.postly.exception.UsersNotFoundException;
import com.socialmedia.postly.repository.TwitRepository;
import com.socialmedia.postly.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService{

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    TwitRepository twitRepository;

    @Override
    public List<Users> findAllUsers() {
        return usersRepository.findAll();
    }

    @Override
    public Users findUserById(Long userId) {
        Users user = usersRepository.findById(userId).orElseThrow(
                ()->new UsersNotFoundException("user not found with id: "+userId));
        return user;
    }

    @Override
    public Users blockAndUnblockUserById(Long userId) {

        Users user = usersRepository.findById(userId).orElseThrow(
                ()->new UsersNotFoundException("user not found with id: "+userId)
        );

        user.setAccountLocked(!user.isAccountLocked());

        return usersRepository.save(user);
    }

    @Override
    public Twit findTwitById(Long twitId) {
        Twit twit=twitRepository.findById(twitId).orElseThrow(
                ()->new TwitNotFoundException("twit with id: "+twitId+" not found")
        );
        return twit;
    }

    @Override
    public List<Twit> findAllTwitsByUserId(Long userId) {
        List<Twit> twits=twitRepository.findAllByUser_UserIdOrderByCreatedAtDesc(userId);
        return twits;
    }
}
