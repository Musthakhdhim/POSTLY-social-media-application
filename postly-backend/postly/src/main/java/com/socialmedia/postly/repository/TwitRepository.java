package com.socialmedia.postly.repository;

import com.socialmedia.postly.entity.Twit;
import com.socialmedia.postly.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TwitRepository extends JpaRepository<Twit, Long>{

    List<Twit> findAllByIsTwitTrueOrderByCreatedAtDesc();

    List<Twit> findByRetwitUserContainsOrUser_UserIdAndIsTwitTrueOrderByCreatedAtDesc(Users user, Long userId);

    List<Twit> findByLikesContainingOrderByCreatedAtDesc(Users user);

    @Query("Select t from Twit t join t.likes l where l.user.userId = :userId")
//    @Query("SELECT t FROM Twit t JOIN t.likes l WHERE l.user.userId = :userId AND t.isReply = false")
    List<Twit> findByLikesUser_UserId(Long userId);

    List<Twit> findAllByUser_UserIdOrderByCreatedAtDesc(Long userId);
}
