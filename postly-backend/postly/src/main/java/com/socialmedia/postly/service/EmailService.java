package com.socialmedia.postly.service;

import com.sendgrid.Method;
import com.sendgrid.Request;
import com.sendgrid.SendGrid;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@AllArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;
    private final SendGrid sendGrid;

    public void sendEmail(String to, String subject, String htmlContent) {
        try {
            // Try Gmail SMTP
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);
            mailSender.send(mimeMessage);
            System.out.println("Email sent via Gmail SMTP");
        } catch (Exception e) {
            System.err.println("Gmail SMTP failed, switching to SendGrid: " + e.getMessage());
            sendViaSendGrid(to, subject, htmlContent);
        }
    }

    private void sendViaSendGrid(String to, String subject, String htmlContent) {
        try {
            Email from = new Email("musthakhdhimnpb@gmail.com");
            Email recipient = new Email(to);
            Content content = new Content("text/html", htmlContent);
            Mail mail = new Mail(from, subject, recipient, content);

            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            sendGrid.api(request);
            System.out.println("Email sent via SendGrid");
        } catch (IOException ex) {
            throw new RuntimeException("SendGrid failed: " + ex.getMessage(), ex);
        }
    }
}

//@Service
//@AllArgsConstructor
//public class EmailService {
//
//    private final JavaMailSender mailSender;
//
//    public void sendEmail(String to, String subject, String text) throws MessagingException {
//        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage,true);
//
//        helper.setTo(to);
//        helper.setSubject(subject);
//        helper.setText(text, true);
//
//        mailSender.send(mimeMessage);
//    }
//}
