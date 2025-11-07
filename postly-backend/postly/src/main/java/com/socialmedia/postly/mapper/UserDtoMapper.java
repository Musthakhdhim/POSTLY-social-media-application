package com.socialmedia.postly.mapper;

import com.socialmedia.postly.dtos.UserDto;
import com.socialmedia.postly.entity.Users;

import java.util.ArrayList;
import java.util.List;

public class UserDtoMapper {

    public static UserDto toUserDto(com.socialmedia.postly.entity.Users user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();

        userDto.setUserId(user.getUserId());
        userDto.setFullName(user.getFullName());
        userDto.setEmail(user.getEmail());
        userDto.setImage(user.getImage());
        userDto.setDOB(user.getDOB());
        userDto.setPhoneNumber(user.getPhoneNumber());
        userDto.setBackgroundImage(user.getBackgroundImage());
        userDto.setBio(user.getBio());
        userDto.setFollowers(toUserDtos(user.getFollowers()));
        userDto.setFollowing(toUserDtos(user.getFollowing()));

//        userDto.setLogin_with_google(user.isLogin_with_google);

        // Note: Followers and following lists, as well as 'req_user' and 'followed' fields,
        // should be set in the service layer where context is available.

        return userDto;
    }

    public static List<UserDto> toUserDtos(List<Users> followers) {
        List<UserDto> userDtos=new ArrayList<>();

        for(Users user: followers) {
            UserDto userDto=new UserDto();
            userDto.setUserId(user.getUserId());
            userDto.setEmail(user.getEmail());
            userDto.setFullName(user.getFullName());
            userDto.setImage(user.getImage());

            userDtos.add(userDto);

        }
        return userDtos;
    }
}
