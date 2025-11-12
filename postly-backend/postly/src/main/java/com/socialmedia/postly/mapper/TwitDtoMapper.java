package com.socialmedia.postly.mapper;

import com.socialmedia.postly.dtos.TwitDto;
import com.socialmedia.postly.dtos.UserDto;
import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.TwitReplyRequest;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.util.TwitUtil;

import java.util.ArrayList;
import java.util.List;

public class TwitDtoMapper {

    private static final String BASE_URL = "http://localhost:8085/images/";

    public static TwitDto toTwitDto(Twit twit, Users req){
        UserDto userDto = UserDtoMapper.toUserDto(twit.getUser());

        boolean isLiked= TwitUtil.isLikedByReqUser(req ,twit);
        boolean isRetwited=TwitUtil.isRetwitedByReqUser(req, twit);

        List<Long> retwitUserId=new ArrayList<>();

        for(Users user: twit.getRetwitUser()){
            retwitUserId.add(user.getUserId());
        }

        TwitDto twitDto=new TwitDto();
        twitDto.setTwitId(twit.getTwitId());
        twitDto.setContent(twit.getContent());
        twitDto.setCreatedAt(twit.getCreatedAt());


//        twitDto.setImage(twit.getImage());
//        twitDto.setVideo(twit.getVideo());


        twitDto.setImage(twit.getImage() != null ? BASE_URL + twit.getImage() : null);
        twitDto.setVideo(twit.getVideo() != null ? BASE_URL + twit.getVideo() : null);



        twitDto.setTotalLikes(twit.getLikes().size());
        twitDto.setTotalReplies(twit.getReplyTwits().size());
        twitDto.setTotalRetweets(twit.getRetwitUser().size());
        twitDto.setUser(userDto);
        twitDto.setLiked(isLiked);
        twitDto.setRetwit(isRetwited);

        twitDto.setRetwitUsersId(retwitUserId);
        twitDto.setReplyTwits(toTwitDtos(twit.getReplyTwits(), req));



        return twitDto;


    }

    public static List<TwitDto> toTwitDtos(List<Twit> twits, Users req){
        List<TwitDto> twitDtos=new ArrayList<>();

        for(Twit twit:twits){
            TwitDto twitDto=toReplyTwitDto(twit, req);
            twitDtos.add(twitDto);
        }
        return twitDtos;
    }

    private static TwitDto toReplyTwitDto(Twit twit, Users req) {
        UserDto userDto = UserDtoMapper.toUserDto(twit.getUser());

        boolean isLiked= TwitUtil.isLikedByReqUser(req ,twit);
        boolean isRetwited=TwitUtil.isRetwitedByReqUser(req, twit);

        List<Long> retwitUserId=new ArrayList<>();

        for(Users user: twit.getRetwitUser()){
            retwitUserId.add(user.getUserId());
        }

        TwitDto twitDto=new TwitDto();

        twitDto.setTwitId(twit.getTwitId());
        twitDto.setContent(twit.getContent());
        twitDto.setCreatedAt(twit.getCreatedAt());

//        twitDto.setImage(twit.getImage());
//        twitDto.setVideo(twit.getVideo());


        twitDto.setImage(twit.getImage() != null ? BASE_URL + twit.getImage() : null);
        twitDto.setVideo(twit.getVideo() != null ? BASE_URL + twit.getVideo() : null);




        twitDto.setTotalLikes(twit.getLikes().size());
        twitDto.setTotalReplies(twit.getReplyTwits().size());
        twitDto.setTotalRetweets(twit.getRetwitUser().size());
        twitDto.setUser(userDto);
        twitDto.setLiked(isLiked);
        twitDto.setRetwit(isRetwited);

        twitDto.setRetwitUsersId(retwitUserId);



        return twitDto;
    }
}
