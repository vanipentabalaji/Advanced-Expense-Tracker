package com.example.expensetracker.controller;

import com.example.expensetracker.dto.ExpenseDTO;
import com.example.expensetracker.dto.UserDTO;
import com.example.expensetracker.exceptions.ExpenseNotFoundException;
import com.example.expensetracker.exceptions.UserNotFoundException;
import com.example.expensetracker.model.Expense;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.service.NotificationService;
import com.example.expensetracker.service.UserService;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import com.example.expensetracker.model.User;


@Slf4j
@RestController
@RequestMapping("/expense-tracker")
@CrossOrigin
public class Controller {

    @Autowired
    private UserService userService;

    @Autowired
    private ExpenseService expenseService;

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/onBoard/users")
    public ResponseEntity<Object> OnBoardUsers(@RequestBody UserDTO userDTO) {
        if (userDTO.getUsername() == null || userDTO.getGmail() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Username and Gmail must not be null");
        }

        // Check if username already exists
        if (userService.isUsernameExists(userDTO.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Username already exists. Please choose a different username");
        }

        User createdUser = userService.onboardUser(userDTO);
        return ResponseEntity.ok(createdUser);
    }

    @PostMapping("/login/users")
    public ResponseEntity<Object> LoginUsers(@RequestBody UserDTO userDTO) {
        try {
            if (userDTO.getUsername() == null || userDTO.getGmail() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Username and Gmail must not be null");
            }
            User loginUser = userService.loginUser(userDTO);
            return ResponseEntity.ok(loginUser);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/add-expenses/{userId}")
    public ResponseEntity<Object> addExpenses(@RequestBody ExpenseDTO expenseDTO, @PathVariable Long userId) {

        try {
            if (StringUtils.isBlank(expenseDTO.getDescription()) || expenseDTO.getAmount() <= 0 ||
                    StringUtils.isBlank(expenseDTO.getExpenseDate().toString()) || StringUtils.isBlank(expenseDTO.getCategory())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("All fields must be provided and valid");
            }

            Expense createdExpense = expenseService.addExpenses(expenseDTO, userId);
            return ResponseEntity.ok(createdExpense);

        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

    @PutMapping("/update-expenses/{expenseId}")
    public ResponseEntity<Object> updateExpenses(@RequestBody ExpenseDTO expenseDTO, @PathVariable Long expenseId) {

        try {
            if (expenseId == null || expenseId <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Expense ID must be provided and valid");
            }

            if (StringUtils.isBlank(expenseDTO.getDescription()) || expenseDTO.getAmount() <= 0 ||
                    StringUtils.isBlank(expenseDTO.getExpenseDate().toString()) || StringUtils.isBlank(expenseDTO.getCategory())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("All fields must be provided and valid");
            }

            Expense updatedExpense = expenseService.updateExpenses(expenseDTO, expenseId);
            return ResponseEntity.ok(updatedExpense);

        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete-expenses/{expenseId}")
    public ResponseEntity<Object> deleteExpenses(@PathVariable Long expenseId) {
        if (expenseId == null || expenseId <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Expense ID must be provided and valid");
        }
        expenseService.deleteExpenses(expenseId);
        return ResponseEntity.ok("Expense deleted successfully");
    }

    @GetMapping("/getAllExpenses/{userId}")
    public ResponseEntity<Object> getAllExpenses(@PathVariable Long userId) {

        try {
            if (userId == null || userId <= 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("User ID must be provided and valid");
            }

            // Get the list of expenses directly
            List<Expense> expenses = expenseService.getAllExpensesByUserId(userId);
            return ResponseEntity.ok(expenses);

        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (ExpenseNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/send-email")
    public ResponseEntity<Object> sendEmail() {
        try {
            notificationService.sendLimitExceededMail("vq1231@srmist.edu.in", "Balaji", 10000, 1000);
            log.info("Test email sent successfully");
            return ResponseEntity.ok("Test email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send test email: " + e.getMessage());
        }
    }
}
