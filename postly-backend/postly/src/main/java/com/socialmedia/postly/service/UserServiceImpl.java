package com.socialmedia.postly.service;

import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.exception.UsersNotFoundException;
import com.socialmedia.postly.jwt.JwtUtils;
import com.socialmedia.postly.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    FileService fileService;

    @Value("${project.image}")
    private String path;

    @Override
    public Users findUserById(Long userId) throws UsersNotFoundException {
        Users user= usersRepository.findById(userId)
                .orElseThrow(()->new UsersNotFoundException("User not found with id: " + userId));
        return user;
    }

    @Override
    public Users findUserProfileByJwt(String jwt) throws UsersNotFoundException {
        String username=jwtUtils.getUserNameFromJwtToken(jwt);
        Users user=usersRepository.findByUsername(username)
                .orElseThrow(()->new UsersNotFoundException("User not found with username: " + username));
        return user;
    }

    @Override
    public Users updateUser(Long userId, Users req, MultipartFile image, MultipartFile backgroundImage) throws UsersNotFoundException, IOException {
        Users user = findUserById(userId);

        if(req.getUsername() != null)
            user.setUsername(req.getUsername());

        if(req.getFullName() != null)
            user.setFullName(req.getFullName());

        if(req.getBio() != null)
            user.setBio(req.getBio());

//        if(req.getImage() != null)
//            user.setImage(req.getImage());
//
//        if(req.getBackgroundImage() != null)
//            user.setBackgroundImage(req.getBackgroundImage());

        if(image!=null && !image.isEmpty()){
            String fileName= fileService.uploadImage(path, image);
            user.setImage(fileName);
        }

        if(backgroundImage!=null && !backgroundImage.isEmpty()){
            String fileName= fileService.uploadImage(path, backgroundImage);
            user.setBackgroundImage(fileName);
        }

        if(req.getDOB() != null)
            user.setDOB(req.getDOB());

        if(req.getPhoneNumber()!=null){
            user.setPhoneNumber(req.getPhoneNumber());
        }

        return usersRepository.save(user);
    }


//    @Override
//    public Users updateUser(Long userId, Users req) throws UsersNotFoundException {
//        Users user = findUserById(userId);
//
//        if(req.getUsername() != null)
//            user.setUsername(req.getUsername());
//
//        if(req.getFullName() != null)
//            user.setFullName(req.getFullName());
//
//        if(req.getBio() != null)
//            user.setBio(req.getBio());
//
//        if(req.getImage() != null)
//            user.setImage(req.getImage());
//
//        if(req.getBackgroundImage() != null)
//            user.setBackgroundImage(req.getBackgroundImage());
//
//        if(req.getDOB() != null)
//            user.setDOB(req.getDOB());
//
//        if(req.getPhoneNumber()!=null){
//            user.setPhoneNumber(req.getPhoneNumber());
//        }
//
//        return usersRepository.save(user);
//    }

    @Override
    public Users followUser(Long userId, Users user) throws UsersNotFoundException {
        Users followToUser= findUserById(userId);

        if(user.getFollowing().contains(followToUser) && followToUser.getFollowers().contains(user)){
            user.getFollowing().remove(followToUser);
            followToUser.getFollowers().remove(user);
        }
        else{
            user.getFollowing().add(followToUser);
            followToUser.getFollowers().add(user);
        }

        usersRepository.save(followToUser);
        usersRepository.save(user);
        return followToUser;
    }

    @Override
    public Users findUserByUsername(String username){
        return usersRepository.findByUsername(username).orElseThrow(()->
                new UsersNotFoundException("user not found with username: "+username));
    }

    @Override
    public List<Users> searchUser(String keyword) {
        return usersRepository.searchUser(keyword);
    }
}