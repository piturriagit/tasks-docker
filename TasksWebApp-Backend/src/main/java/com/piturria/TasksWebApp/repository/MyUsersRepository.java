package com.piturria.TasksWebApp.repository;

import com.piturria.TasksWebApp.model.MyUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyUsersRepository extends JpaRepository<MyUser, Integer> {
    MyUser findByUsername(String username);
}
