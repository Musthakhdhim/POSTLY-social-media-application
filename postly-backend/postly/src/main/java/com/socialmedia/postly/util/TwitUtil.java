package com.socialmedia.postly.util;

import com.socialmedia.postly.entity.Likes;
import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.Users;
import org.springframework.security.core.userdetails.User;

public class TwitUtil {

    public static boolean isLikedByReqUser(Users req, Twit twit){
        for(Likes likes:twit.getLikes()){
            if(likes.getUser().getUserId().equals(req.getUserId())){
                return true;
            }
        }
        return false;
    }

    public static boolean isRetwitedByReqUser(Users req,  Twit twit){
        for(Users user:twit.getRetwitUser()){
            if(user.getUserId().equals(req.getUserId())){
                return true;
            }
        }
        return false;
    }

}
