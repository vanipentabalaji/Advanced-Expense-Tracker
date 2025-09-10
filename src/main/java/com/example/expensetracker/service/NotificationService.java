package com.example.expensetracker.service;

public interface NotificationService {
    
        void sendLimitExceededMail(String to, String name, double monthlyLimit, double totalAmountSpent);

}
