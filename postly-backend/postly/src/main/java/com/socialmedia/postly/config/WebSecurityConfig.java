package com.socialmedia.postly.config;

import com.socialmedia.postly.filter.JwtAuthFilter;
import com.socialmedia.postly.security.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

/**
 * Spring Security configuration for the application.
 *
 * <p>Defines the security filter chain, authentication provider, password encoder,
 * JWT authentication filter and a CORS filter. Security is configured to be stateless
 * and to permit authentication endpoints while securing all other requests.</p>
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    /**
     * Service responsible for loading user-specific data used during authentication.
     */
    @Autowired
    UserDetailsServiceImpl userDetailsService;

    /**
     * Configure the SecurityFilterChain for HTTP security.
     *
     * <p>Disables CSRF and default CORS handling, sets the session policy to stateless,
     * adds the JWT filter before UsernamePasswordAuthenticationFilter and configures
     * request authorization rules.</p>
     *
     * @param http the HttpSecurity to configure
     * @return the configured SecurityFilterChain
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http){
        try {
            http.csrf(AbstractHttpConfigurer::disable)
                    .cors(AbstractHttpConfigurer::disable)
                    .sessionManagement((session)->
                            session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                    .addFilterBefore(jwtAuthFilter(), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests((auth) -> auth
                    .requestMatchers("/api/auth/**").permitAll()
                    .anyRequest().authenticated()
                );

            return http.build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Create and expose the JwtAuthFilter bean.
     *
     * @return a new JwtAuthFilter instance
     */
    @Bean
    public JwtAuthFilter jwtAuthFilter(){
        return new JwtAuthFilter();
    }

    /**
     * Expose the AuthenticationManager from the provided AuthenticationConfiguration.
     *
     * @param configuration source of the AuthenticationManager
     * @return the AuthenticationManager
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration){
        try {
            return configuration.getAuthenticationManager();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Configure an AuthenticationProvider backed by a DaoAuthenticationProvider,
     * using the application's UserDetailsService and a BCrypt password encoder.
     *
     * @return configured AuthenticationProvider
     */
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        // Configure your userDetailsService and passwordEncoder here
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * BCrypt password encoder bean.
     *
     * @return PasswordEncoder instance using BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configure a CorsFilter that allows requests from http://localhost:3000 and
     * permits credentials, any header and any method.
     *
     * @return configured CorsFilter
     */
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
