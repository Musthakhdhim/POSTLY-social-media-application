package com.socialmedia.postly.service;

import com.socialmedia.postly.entity.Likes;
import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.exception.TwitNotFoundException;
import com.socialmedia.postly.exception.UsersNotFoundException;
import com.socialmedia.postly.repository.LikesRepository;
import com.socialmedia.postly.repository.TwitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImpl implements LikeService{

    @Autowired
    LikesRepository likesRepository;

    @Autowired
    TwitRepository twitRepository;

    @Autowired
    TwitService twitService;

    @Override
    public Likes likeTwit(Long twitId, Users user) throws UsersNotFoundException, TwitNotFoundException {
        Likes isLikeExist=likesRepository.isLikesExist(user.getUserId(), twitId);

        if(isLikeExist!=null){
            likesRepository.deleteById(isLikeExist.getId());
            return isLikeExist;
        }

        Twit twit=twitService.findById(twitId);

        Likes like=new Likes();
        like.setTwit(twit);
        like.setUser(user);

        Likes savedLike=likesRepository.save(like);

        twit.getLikes().add(savedLike);
        twitRepository.save(twit);

        return savedLike;

    }

    @Override
    public List<Likes> getAllLikes(Long twitId) throws TwitNotFoundException {
        Twit twit=twitService.findById(twitId);
        List<Likes> likes = likesRepository.findByTwit_TwitId(twitId);
        return likes;
    }
}
