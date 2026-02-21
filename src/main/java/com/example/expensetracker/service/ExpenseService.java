package com.example.expensetracker.service;


import com.example.expensetracker.dto.ExpenseDTO;
import com.example.expensetracker.model.Expense;
import java.util.List;

public interface ExpenseService {

    Expense addExpenses(ExpenseDTO expenseDTO, Long userId);

    Expense updateExpenses(ExpenseDTO expenseDTO, Long expenseId);

    Expense deleteExpenses(Long expenseId);

    ExpenseDTO getExpenses(Long userId);

    List<Expense> getAllExpensesByUserId(Long userId);
}
