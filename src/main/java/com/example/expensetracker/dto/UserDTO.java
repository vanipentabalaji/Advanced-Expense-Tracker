package com.example.expensetracker.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {

    private String username;
    private String gmail;
    private double monthlyLimit; // Monthly limit for expenses

    public UserDTO() {
    }

    public UserDTO(String username, String gmail, double monthlyLimit) {
        this.username = username;
        this.gmail = gmail;
        this.monthlyLimit = monthlyLimit;
    }
}