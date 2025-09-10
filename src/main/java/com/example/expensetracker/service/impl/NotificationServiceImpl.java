package com.example.expensetracker.service.impl;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.example.expensetracker.service.NotificationService;

import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    public NotificationServiceImpl(JavaMailSender mailSender, TemplateEngine templateEngine) {
        this.templateEngine = templateEngine;
        this.mailSender = mailSender;

    }
    
    // @Override
    // public void sendMail(String to, String subject, String body) {
    //     SimpleMailMessage message = new SimpleMailMessage();
    //     message.setFrom("balajivanipenta@gmail.com");
    //     message.setTo(to);
    //     message.setSubject(subject);
    //     message.setText(body);

    //     javaMailSender.send(message);
    // }

    @Override
    public void sendLimitExceededMail(String to, String name, double monthlyLimit, double totalAmountSpent) {
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("monthlyLimit", monthlyLimit);
        context.setVariable("totalAmountSpent", totalAmountSpent);

        // Process the html template
        String htmlTextTemplate = templateEngine.process("limit-exceeded", context);

        //Prepare the email message
        MimeMessage message = mailSender.createMimeMessage();
    
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("balajivanipenta@gmail.com", "Expense Tracker");
            helper.setTo(to);
            helper.setSubject("Monthly Limit Exceeded");
            helper.setText(htmlTextTemplate, true);

            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Failed to send HTML email", e);
        }
        
    }

}
