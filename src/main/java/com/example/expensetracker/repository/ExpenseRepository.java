package com.example.expensetracker.repository;

import com.example.expensetracker.model.Expense;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
    /**
     * Finds expenses by user ID.
     *
     * @param userId the ID of the user
     * @return a list of expenses associated with the user
     */
    List<Expense> findByUserId(Long userId);
    
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId AND FUNCTION('MONTH', e.expenseDate) = :month AND FUNCTION('YEAR', e.expenseDate) = :year")
    Double getMonthlyTotalExpenses(Long userId, int month, int year);
}
