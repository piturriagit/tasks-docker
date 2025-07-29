package com.piturria.TasksWebApp.service;

import com.piturria.TasksWebApp.model.Task;
import com.piturria.TasksWebApp.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private TaskRepository repository;

    //Constructor injection
    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Task getTaskById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Task addTask(Task task) {
        return repository.save(task);
    }

    public Task updateTask(int id, Task task) {
        if(getTaskById(id)==null)
            return null;
        task.setId(id);
        return repository.save(task);
    }

    public void deleteTaskById(int id) {
        repository.deleteById(id);
    }

    public void deleteAllTasks() {
        repository.deleteAll();
    }
}