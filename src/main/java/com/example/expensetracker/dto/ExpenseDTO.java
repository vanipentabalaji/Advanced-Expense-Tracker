package com.example.expensetracker.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseDTO {
    private Long userId;
    private String description;
    private double amount;
    private LocalDate expenseDate;
    private String category;
    
}
