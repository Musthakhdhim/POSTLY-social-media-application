package com.socialmedia.postly.repository;

import com.socialmedia.postly.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Query("SELECT l FROM Likes l WHERE l.user.userId = :userId AND l.twit.twitId = :twitId")
    public Likes isLikesExist(@Param("userId") Long userId, @Param("twitId") Long twitId);

    @Query("SELECT l FROM Likes l WHERE l.twit.twitId = :twitId")
    public List<Likes> findByTwit_TwitId(@Param("twitId") Long twitId);
}
