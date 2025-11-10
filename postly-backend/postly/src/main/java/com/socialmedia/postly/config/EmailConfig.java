package com.socialmedia.postly.config;

import com.sendgrid.SendGrid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

/**
 * Configuration for email delivery within the application.
 *
 * <p>Exposes a JavaMailSender configured for Gmail SMTP and a SendGrid client bean.
 * Credentials and the SendGrid key are injected from application properties.</p>
 */
@Configuration
public class EmailConfig {

    @Value("${spring.mail.username}")
    private String email;

    @Value("${spring.mail.password}")
    private String password;


    @Value("${sendgrid.api.key}")
    private String sendGridApiKey;


    /**
     * Configure a JavaMailSender using Gmail SMTP settings.
     *
     * @return configured JavaMailSender
     */
    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername(email);
        mailSender.setPassword(password);

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        return mailSender;
    }


    /**
     * Create and expose a SendGrid client initialized with the configured API key.
     *
     * @return SendGrid client instance
     */
    @Bean
    public SendGrid sendGrid() {
//        System.out.println("SendGrid API Key: " + sendGridApiKey);
        return new SendGrid(sendGridApiKey);
    }

}
