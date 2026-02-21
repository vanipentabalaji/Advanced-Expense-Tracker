package com.example.expensetracker.service.impl;

import com.example.expensetracker.dto.UserDTO;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.service.UserService;
import com.example.expensetracker.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User onboardUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setGmail(userDTO.getGmail());
        user.setCreatedAt(LocalDate.now());
        user.setMonthlyLimit(userDTO.getMonthlyLimit()); 
        return userRepository.save(user);
    }

    @Override
    public User loginUser(UserDTO userDTO) throws UserNotFoundException {
        // Search by username first, then verify email matches
        Optional<User> userOptional = userRepository.findByUsername(userDTO.getUsername());
        
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("User not found with username: " + userDTO.getUsername());
        }
        
        User user = userOptional.get();
        
        // Verify that the email matches for security
        if (!user.getGmail().equalsIgnoreCase(userDTO.getGmail())) {
            throw new UserNotFoundException("Email does not match the username");
        }
        
        return user;
    }

    @Override
    public boolean isUsernameExists(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}
