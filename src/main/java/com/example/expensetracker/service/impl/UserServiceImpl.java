package com.example.expensetracker.service.impl;

import com.example.expensetracker.dto.UserDTO;
import com.example.expensetracker.model.User;
import com.example.expensetracker.repository.UserRepository;
import com.example.expensetracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

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
}
