package com.socialmedia.postly.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.socialmedia.postly.entity.Users;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Concrete UserDetails implementation used by Spring Security.
 *
 * <p>Holds the information about an authenticated user retrieved from the domain
 * Users entity, including id, username, email, password and granted authorities.</p>
 */
public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    private String email;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    /**
     * Create a new UserDetailsImpl.
     *
     * @param id user id from the domain entity
     * @param username login username
     * @param email user email
     * @param password encoded password
     * @param authorities granted authorities for the user
     */
    public UserDetailsImpl(Long id, String username, String email, String password,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.authorities = authorities;
    }

    /**
     * Build a UserDetailsImpl from a domain Users entity.
     *
     * @param user domain Users entity
     * @return populated UserDetailsImpl instance
     */
    public static UserDetailsImpl build(Users user) {

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    /**
     * Return authorities granted to the user.
     *
     * @return collection of granted authorities
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    /**
     * Returns the hashed password used to authenticate the user.
     *
     * @return password string
     */
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Get the domain identifier for the user.
     *
     * @return user id
     */
    public Long getId() {
        return id;
    }

    /**
     * Get the user's email address.
     *
     * @return user email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Get the username used to authenticate the user.
     *
     * @return username
     */
    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * Equality is based on the user id.
     *
     * @param o other object
     * @return true if both represent the same user id
     */
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
