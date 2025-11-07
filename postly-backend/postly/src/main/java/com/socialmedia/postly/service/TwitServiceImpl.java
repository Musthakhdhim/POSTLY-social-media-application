package com.socialmedia.postly.service;

import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.TwitReplyRequest;
import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.exception.TwitDeleteException;
import com.socialmedia.postly.exception.TwitNotFoundException;
import com.socialmedia.postly.exception.UsersNotFoundException;
import com.socialmedia.postly.repository.TwitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TwitServiceImpl implements TwitService{

    @Autowired
    private TwitRepository twitRepository;

    @Autowired
    private FileService fileService;

    @Value("${project.image}")
    private String path;

    //before code
//    @Override
//    public Twit createTwit(Twit req, Users user) {
//        Twit twit = new Twit();
//        twit.setContent(req.getContent());
//        twit.setCreatedAt(LocalDateTime.now());
//        twit.setImage(req.getImage());
//        twit.setUser(user);
//        twit.setReply(false);
//        twit.setTwit(true);
//        twit.setVideo(req.getVideo());
//
//        return twitRepository.save(twit);
//    }

    //after code--multipart file
    @Override
    public Twit createTwit(Twit req, MultipartFile image,MultipartFile video,  Users user) throws IOException {
        Twit twit = new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(LocalDateTime.now());
//        twit.setImage(req.getImage());

        if(image!=null && !image.isEmpty()){
            String fileName= fileService.uploadImage(path, image);
            twit.setImage(fileName);
        }

        if(video!=null && !video.isEmpty()){
            String fileName= fileService.uploadImage(path, video);
            twit.setImage(fileName);
        }

        twit.setUser(user);
        twit.setReply(false);
        twit.setTwit(true);
        twit.setVideo(req.getVideo());

        return twitRepository.save(twit);
    }

    @Override
    public List<Twit> findAllTwit() {
        return twitRepository.findAllByIsTwitTrueOrderByCreatedAtDesc();
    }

    @Override
    public Twit retwit(Long twitId, Users user) throws UsersNotFoundException, TwitNotFoundException {
        Twit twit=findById(twitId);
        if(twit.getRetwitUser().contains(user)){
            twit.getRetwitUser().remove(user);
        }
        else{
            twit.getRetwitUser().add(user);
        }
        return twitRepository.save(twit);
    }

    @Override
    public Twit findById(Long twitId) throws TwitNotFoundException {
        Twit twit=twitRepository.findById(twitId)
                .orElseThrow(()->new TwitNotFoundException("Twit not found with id: "+twitId));
        return twit;
    }

    @Override
    public void deleteTwitById(Long twitId, Long userId) throws TwitNotFoundException, UsersNotFoundException {
        Twit twit=findById(twitId);
        if(twit.getUser().getUserId().equals(userId)){
            twitRepository.deleteById(twitId);
        }
        else {
            throw new TwitDeleteException("you can't delete other user's twit");
        }
    }

    @Override
    public Twit removeFromRetwit(Long twitId, Users user) throws UsersNotFoundException, TwitNotFoundException {
        return null;
    }

    @Override
    public Twit createReply(TwitReplyRequest req, MultipartFile image, Users user) throws TwitNotFoundException, IOException {

        Twit replyFor= findById(req.getTwitId());

        Twit twit = new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(LocalDateTime.now());
//        twit.setImage(req.getImage());
        if(image!=null && !image.isEmpty()){
            String fileName= fileService.uploadImage(path, image);
            twit.setImage(fileName);
        }
        twit.setUser(user);
        twit.setReply(true);
        twit.setTwit(false);
        twit.setReplyFor(replyFor);

        Twit savedReply =twitRepository.save(twit);
        replyFor.getReplyTwits().add(savedReply);

        twitRepository.save(replyFor);
        return replyFor;
    }

    @Override
    public List<Twit> getUserTwit(Users user) {
        return twitRepository.findByRetwitUserContainsOrUser_UserIdAndIsTwitTrueOrderByCreatedAtDesc(user, user.getUserId());
    }

    @Override
    public List<Twit> findByLikesContainsUser(Users user) {
        return twitRepository.findByLikesUser_UserId(user.getUserId());
    }
}
