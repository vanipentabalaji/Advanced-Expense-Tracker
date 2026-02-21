package com.example.expensetracker.service;

import com.example.expensetracker.dto.UserDTO;
import com.example.expensetracker.model.User;
import com.example.expensetracker.exceptions.UserNotFoundException;

public interface UserService {
    User onboardUser(UserDTO userDTO);
    User loginUser(UserDTO userDTO) throws UserNotFoundException;
    boolean isUsernameExists(String username);
}
