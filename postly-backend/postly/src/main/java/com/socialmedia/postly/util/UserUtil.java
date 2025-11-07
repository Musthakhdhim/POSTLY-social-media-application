package com.socialmedia.postly.util;

import com.socialmedia.postly.entity.Users;

public class UserUtil {

    public static boolean isReqUser(Users req, Users user1){
        return req.getUserId().equals(user1.getUserId());
    }

    public static boolean isFollowedByReqUser(Users req, Users user1){
        return req.getFollowing().contains(user1);
    }
}
