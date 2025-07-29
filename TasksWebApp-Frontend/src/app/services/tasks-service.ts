import { inject, Injectable } from '@angular/core';
import { Task } from '../model/task.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  http = inject(HttpClient);
  //http://localhost:8080/swagger-ui/index.html
  //Enable CORS in backend when different ip:port!!

  getTasks() {
    const url = `http://localhost:8080/api/tasks`;
    return this.http.get<Array<Task>>(url);
  }
  postTask(task:Task) {
    const url = `http://localhost:8080/api/tasks`;
    return this.http.post<Array<Task>>(url, task);
  }
  putTask(task:Task) {
    const url = `http://localhost:8080/api/tasks/${task.id}`;
    return this.http.put<Array<Task>>(url, task);
  }
  deleteTask(id:number) {
    const url = `http://localhost:8080/api/tasks/${id}`;
    return this.http.delete(url);
  }
  deleteTasks() {
    const url = `http://localhost:8080/api/tasks`;
    return this.http.delete(url);
  }
}
