import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../model/task.type';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks-service';
import { ImageIcon } from '../components/image-icon/image-icon';
import { DatePipe } from '@angular/common';
import { Feedback } from "../components/feedback/feedback";

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, ImageIcon, DatePipe, Feedback],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  isLoading = signal(false);
  loadingImage = signal("waiting.png");
  loadingMessage = signal("Loading...");
  nolistImage = signal("congrats.png");
  nolistMessage = signal("You are up to date!!");
  isFormVisible = signal(false);
  isNew = signal(true);
  buttonAdd = signal('bt_add.png');
  altAdd = signal('Add new task');
  buttonEdit = signal('bt_edit.png');
  altEdit = signal('Edit this task');
  buttonDelete = signal('bt_delete.png');
  altDelete = signal('Delete this task');
  buttonDeleteAll = signal('bt_deleteAll.png');
  altDeleteAll = signal('Delete all tasks!!');
  buttonSave = signal('bt_save.png');
  altSaveAdd = signal('Save new task');
  altSaveEdit = signal('Update task');
  buttonCancel = signal('bt_cancel.png');
  altCancel = signal('Close');

  minChars = signal(3);
  maxChars = signal(255); //max on database
  form: FormGroup = new FormGroup({
    id : new FormControl(0, [Validators.required]),
    title : new FormControl('',[Validators.required,Validators.minLength(this.minChars())]),
    description : new FormControl(''),
    creationDate : new FormControl(new Date())
  });

  tasksList: Array<Task> = [];
  task: Task = {
    id : 0,
    title : '',
    description : '',
    creationDate : new Date('2025/07/29')
  }

  constructor(private router: Router, private service: TasksService) { 
    this.form.controls['id'].disable();
  };

  ngOnInit(): void {
    this.loadTasksList();
  }

  newTask() {
    this.isNew.set(true);
    this.resetForm();
    this.isFormVisible.update( isFormVisible => !isFormVisible);
  }
  editThisTask(item: any) {
    this.task.id=item.id;
    this.task.title=item.title;
    this.task.description=item.description;
    this.isNew.set(false);
    this.showForm();
  }
  resetForm() {
    this.task.id=0;
    this.task.title='';
    this.task.description='';
    this.task.creationDate=new Date();
    this.form.controls['title'].markAsUntouched();
    this.form.controls['title'].markAsPristine();
  }
  cancel() {
    this.hideForm();
  };
  hideForm() {
    this.isFormVisible.set(false);
  }
  showForm() {
    this.isFormVisible.set(true);
  }

  loadTasksList() {
    this.isLoading.set(true);
    this.service.getTasks().subscribe({
      next: data => { 
        this.tasksList=data;
        this.isLoading.set(false);
        console.log('GET tasks: ' + data.length + ' items');
      },
      error: error => {
        this.router.navigate(['error']);
        console.log('GET tasks error:' + error.status);
      }
    });
  }

  addTask() {
    this.service.postTask(this.task).subscribe({
      next: data => { 
        this.loadTasksList();
        this.hideForm();
        console.log('POST tasks: ' + JSON.stringify(data));
      },
      error: error => {
        this.router.navigate(['error']);
        console.log('POST tasks error:' + error.status 
          + '\nData: ' +  JSON.stringify(this.task));
      }
    });
  }

  updateTask() {
    this.service.putTask(this.task).subscribe({
      next: data => { 
        this.loadTasksList();
        this.hideForm();
        console.log('PUT tasks/' + this.task.id + ': ' + JSON.stringify(data));
      },
      error: error => {
        this.router.navigate(['error']);
        console.log('PUT tasks/' + this.task.id + ' error:' + error.status 
          + '\nData: ' +  JSON.stringify(this.task));
      }
    });
  }

  deleteThisTask(item:any) {
    this.service.deleteTask(item.id).subscribe({
      next: data => { 
        this.loadTasksList();
        console.log('DELETE tasks/' + item.id + ': ' + JSON.stringify(data));
      },
      error: error => {
        this.router.navigate(['error']);
        console.log('DELETE tasks/' + item.id + ' error:' + error.status);
      }
    });
  }

  deleteTasksList() {
    if (! confirm(`‼️ This will erase ALL your tasks! \nAre you sure you want to delete then?`) ) {
      console.log('Delete action cancel by user');
      return;
    }
    this.service.deleteTasks().subscribe({
      next: data => { 
        this.loadTasksList();
        console.log('DELETE tasks');
      },
      error: error => {
        this.router.navigate(['error']);
        console.log('DELETE tasks error:' + error.status);
      }
    });
  }
}
