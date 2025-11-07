package com.socialmedia.postly.repository;

import com.socialmedia.postly.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    Optional<Users> findByEmail(String email);

    @Query("SELECT u FROM Users u WHERE u.username LIKE %:keyword% OR u.fullName LIKE %:keyword%")
    List<Users> searchUser(String keyword);
}
