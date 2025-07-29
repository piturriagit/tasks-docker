package com.piturria.TasksWebApp.service;

import com.piturria.TasksWebApp.exceptions.DuplicateEntryException;
import com.piturria.TasksWebApp.model.BearerToken;
import com.piturria.TasksWebApp.model.MyUser;
import com.piturria.TasksWebApp.repository.MyUsersRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private MyUsersRepository repository;
    private AuthenticationManager authenticationManager;
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    //Constructor injection
    public AuthService(MyUsersRepository repository,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.repository = repository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public MyUser register(MyUser user) {

        //NOT ENCODED PASSWORD
        //user.setPassword(user.getPassword());

        //ENCODED PASSWORD
        user.setPassword(encoder.encode(user.getPassword()));
        try {
            return repository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DuplicateEntryException("User " + user.getUsername() + " is already used", e);
        }
    }

    public boolean verifyCredentials(MyUser user) {
        Authentication authentication = authenticationManager
            .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        return authentication.isAuthenticated();
    }

    public BearerToken generateToken(String username) {
        long seconds = 600;
        BearerToken token = new BearerToken();
        token.setUsername(username);
        token.setJwt(jwtService.generateToken(username, seconds));
        token.setExpiration(jwtService.extractExpiration(token.getJwt()));
        return token;
    }
}
