package com.piturria.TasksWebApp.controller;

import com.piturria.TasksWebApp.model.Task;
import com.piturria.TasksWebApp.service.TaskService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MyTaskController {

    private TaskService service;

    //Constructor injection
    public MyTaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping("/api/tasks")
    public ResponseEntity<List<Task>> getAllTasks() {
        System.out.println("--------- GET /api/tasks");
        return new ResponseEntity<>(service.getAllTasks(), HttpStatus.OK);
    }

    @GetMapping("/api/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable int id) {
        System.out.println("--------- GET /api/tasks/" + id);
        Task task=service.getTaskById(id);
        if(task == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PostMapping("/api/tasks")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        System.out.println("--------- POST /vapi/tasks : " + task);
        Task result;
        return new ResponseEntity<>(service.addTask(task),HttpStatus.CREATED);
    }

    @PutMapping("/api/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable int id, @RequestBody Task task) {
        System.out.println("--------- PUT /api/tasks/" + id +" : " + task);
        Task editedTask=service.updateTask(id, task);
        if(editedTask == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(editedTask,HttpStatus.OK);
    }

    @DeleteMapping("/api/tasks/{id}")
    public ResponseEntity<HttpStatus> deleteTaskById(@PathVariable int id) {
        System.out.println("--------- DELETE /api/tasks/" + id);
        service.deleteTaskById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/api/tasks")
    public ResponseEntity<HttpStatus> deleteAllTasks() {
        System.out.println("--------- DELETE /api/tasks");
        service.deleteAllTasks();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
