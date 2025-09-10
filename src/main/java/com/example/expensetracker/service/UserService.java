package com.example.expensetracker.service;

import com.example.expensetracker.dto.UserDTO;
import com.example.expensetracker.model.User;

public interface UserService {
    User onboardUser(UserDTO userDTO);
}
