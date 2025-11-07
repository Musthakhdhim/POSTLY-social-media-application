package com.socialmedia.postly.mapper;

import com.socialmedia.postly.dtos.LikeDto;
import com.socialmedia.postly.dtos.TwitDto;
import com.socialmedia.postly.dtos.UserDto;
import com.socialmedia.postly.entity.Likes;
import com.socialmedia.postly.entity.Users;

import java.util.ArrayList;
import java.util.List;

public class LikeDtoMapper {

    public static LikeDto toLikeDto(Likes like, Users req){

        UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
        UserDto reqUserDto=UserDtoMapper.toUserDto(req);

        TwitDto twitDto = TwitDtoMapper.toTwitDto(like.getTwit(), req);
        LikeDto likeDto=new LikeDto();

        likeDto.setId(like.getId());
        likeDto.setTwitId(twitDto);
        likeDto.setUser(userDto);

        return likeDto;
    }

    public static List<LikeDto> toLikeDtos(List<Likes> likes, Users req){
        List<LikeDto> likeDtos=new ArrayList<>();

        for(Likes like:likes){
            UserDto userDto = UserDtoMapper.toUserDto(like.getUser());
            TwitDto twitDto = TwitDtoMapper.toTwitDto(like.getTwit(), req);

            LikeDto likeDto=new LikeDto();

            likeDto.setId(like.getId());
            likeDto.setTwitId(twitDto);
            likeDto.setUser(userDto);

            likeDtos.add(likeDto);
        }

        return likeDtos;
    }
}
