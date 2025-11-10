package com.socialmedia.postly.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * General web configuration for the application.
 *
 * <p>Provides CORS configuration and a ModelMapper bean used for DTO mapping.</p>
 */
@Configuration
public class WebConfig {

    /**
     * Configure global CORS mappings.
     *
     * <p>This configuration allows requests from any origin pattern and explicitly
     * permits http://localhost:3000, supports common HTTP methods and allows credentials.</p>
     *
     * @return a WebMvcConfigurer that applies the CORS configuration
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*") // allows any origin
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }

    /**
     * Create a ModelMapper bean for mapping between DTOs and entities.
     *
     * @return a configured ModelMapper instance
     */
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }
}
