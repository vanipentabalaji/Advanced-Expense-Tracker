package com.example.expensetracker.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.expensetracker.dto.ExpenseDTO;
import com.example.expensetracker.exceptions.ExpenseNotFoundException;
import com.example.expensetracker.exceptions.UserNotFoundException;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.ExpenseRepository;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.service.NotificationService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Override
    public Expense addExpenses(ExpenseDTO expenseDTO, Long userId) {
        User user = userRepository.findById(userId).orElse(null);

        if (user == null) {
            throw new UserNotFoundException("User with id " + userId + " not found");
        }

        Expense expense = new Expense();
        expense.setUser(user);
        expense.setDescription(expenseDTO.getDescription());
        expense.setAmount(expenseDTO.getAmount());
        expense.setExpenseDate(expenseDTO.getExpenseDate());
        expense.setCategory(expenseDTO.getCategory());
        expenseRepository.save(expense);

        LocalDate expenseDate = expenseDTO.getExpenseDate();
        int month = expenseDate.getMonthValue();
        int year = expenseDate.getYear();
        Double totalExpenses = expenseRepository.getMonthlyTotalExpenses(userId, month, year);

        if (totalExpenses != null && totalExpenses > user.getMonthlyLimit()) {
            expense.setLimitExceeded(true);
            notificationService.sendLimitExceededMail(user.getGmail(), user.getUsername(), user.getMonthlyLimit(), totalExpenses);
            log.info("Monthly limit exceeded for user with id " + userId + ". Notification sent successfully");
        } else {
            expense.setLimitExceeded(false);
        }
        log.info("Expense added for user with id " + userId + ": " + expense);
        return expense;
    }

    @Override
    public Expense updateExpenses(ExpenseDTO expenseDTO, Long expenseId) {
        Expense expense = expenseRepository.findById(expenseId).orElse(null);
        if (expense == null) {
            throw new ExpenseNotFoundException("Expense with id " + expenseId + " not found");
        }
        expense.setDescription(expenseDTO.getDescription());
        expense.setAmount(expenseDTO.getAmount());
        expense.setExpenseDate(expenseDTO.getExpenseDate());
        expense.setCategory(expenseDTO.getCategory()); 
        return expenseRepository.save(expense);
    }

    @Override
    public Expense deleteExpenses(Long expenseId) {
        Expense expense = expenseRepository.findById(expenseId).orElse(null);
        if (expense == null) {
            throw new ExpenseNotFoundException("Expense with id " + expenseId + " not found");
        }
        expenseRepository.delete(expense);
        return expense;
    }

    @Override
    public ExpenseDTO getExpenses(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User with id " + userId + " not found");
        }
        List<Expense> expensesList = expenseRepository.findByUserId(userId);
        
        // Return empty list instead of throwing exception
        if (expensesList.isEmpty()) {
            expensesList = new java.util.ArrayList<>();
        }
        
        // Create a wrapper to return
        ExpenseDTO expenseDTO = new ExpenseDTO();
        expenseDTO.setUserId(userId);
        
        return expenseDTO;
    }

    @Override
    public List<Expense> getAllExpensesByUserId(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User with id " + userId + " not found");
        }
        List<Expense> expensesList = expenseRepository.findByUserId(userId);
        
        // Return empty list if no expenses
        if (expensesList == null) {
            expensesList = new java.util.ArrayList<>();
        }
        
        return expensesList;
    }
}
