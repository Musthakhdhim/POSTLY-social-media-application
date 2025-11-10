package com.socialmedia.postly.security;

import com.socialmedia.postly.entity.Users;
import com.socialmedia.postly.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service used by Spring Security to load user-specific data.
 *
 * <p>This implementation delegates to a UsersRepository to locate a user by username
 * and converts the domain Users entity into a UserDetails instance understood by
 * Spring Security.</p>
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    /**
     * Repository used to find Users entities by username.
     */
    @Autowired
    UsersRepository usersRepository;

    /**
     * Locates the user by the supplied username.
     *
     * <p>If the user is found, a UserDetails implementation is returned for use by
     * the authentication framework. If not found, a UsernameNotFoundException is thrown.</p>
     *
     * @param username the username identifying the user whose data is required
     * @return UserDetails populated with user information and authorities
     * @throws UsernameNotFoundException if the user could not be found
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

        return UserDetailsImpl.build(users);
    }
}
