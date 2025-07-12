package com.writershub.service;

import com.writershub.entity.User;
import com.writershub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public Optional<User> findByUsernameAndPassword(String username, String password) {
        return userRepo.findByUsernameAndPassword(username, password);
    }

    public boolean existsByUsername(String username) {
        return userRepo.findByUsername(username).isPresent();
    }

    public User save(User user) {
        return userRepo.save(user);
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

	public void deleteUserById(Long userId) {
		userRepo.deleteById(userId);
	}
    
    
}
