package com.piturria.TasksWebApp.service;

import com.piturria.TasksWebApp.model.MyUser;
import com.piturria.TasksWebApp.model.MyUserDetails;
import com.piturria.TasksWebApp.repository.MyUsersRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private MyUsersRepository repository;

    //@Autowired by default with constructor injection
    public MyUserDetailsService(MyUsersRepository repository) {
        this.repository = repository;
    }

    //Get user from database
    @Override
    public MyUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MyUser user = repository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("User not found: " + username);
        }
        return new MyUserDetails(user);
    }
}
