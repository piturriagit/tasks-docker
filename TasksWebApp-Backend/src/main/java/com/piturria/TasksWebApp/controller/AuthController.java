package com.piturria.TasksWebApp.controller;

import com.piturria.TasksWebApp.exceptions.DuplicateEntryException;
import com.piturria.TasksWebApp.model.BearerToken;
import com.piturria.TasksWebApp.model.MyUser;
import com.piturria.TasksWebApp.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

    private AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody MyUser user) {
        try {
            service.verifyCredentials(user);
        } catch (BadCredentialsException badCredentialsException) {
            try {
                service.register(user);
            } catch (DuplicateEntryException e) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
            }
        }
        BearerToken token = service.generateToken(user.getUsername());
        System.out.println("--------- POST /auth/register: " + token);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<BearerToken>  login(@RequestBody MyUser user) {
        try {
            service.verifyCredentials(user);
            BearerToken token = service.generateToken(user.getUsername());
            System.out.println("--------- POST /auth/login: " + token);
            return new ResponseEntity<>(token, HttpStatus.OK);
        } catch (BadCredentialsException badCredentialsException) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

/*    @PostMapping("/auth/logout")
    public ResponseEntity<BearerToken>  login(@RequestBody BearerToken token) {
        service.removeToken(token);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }
 */
}