import { Component, signal } from '@angular/core';
import { User } from '../model/user.type';
import { AuthResponse } from '../model/authResponse.type';
import { AuthService } from '../services/auth-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  label = ['Login', 'Sign Up'];
  alternate = [this.label[1], this.label[0]];
  isRegister = signal(0);
  feedback = signal(''); 
  formUsername = '';
  formPassword = '';

  user : User = { username:'', password:''};
  auth : AuthResponse = { "username": '', jwt: '', expiration : ''}

  constructor(private authService: AuthService, 
    private router: Router) { };
   
  onAlternate() {
    this.isRegister.set(this.isRegister() === 0 ? 1 : 0);
  }

  onRegister() {
    console.log(`register (${this.formUsername}, ${this.formPassword})... `);
    this.user.username=this.formUsername;
    this.user.password=this.formPassword;
    this.authService.register(this.user).subscribe({
      next: data => { 
        this.authService.storeToken(data);     //Store token in browser
        this.authService.updateUser(this.user.username);
        console.log(`POST register: ${JSON.stringify(data)}`);
        this.router.navigate(['/']);
      },
      error: error => {
        if(error.status == 409)
          this.feedback.set('* Try with a different username');
        else
          this.router.navigate(['error']);
        console.log('HTTP error code:', error.status);
      }
    });
  };

  onLogin() {
    console.log(`login (${this.formUsername}, ${this.formPassword})... `);
    this.user.username=this.formUsername;
    this.user.password=this.formPassword;
    this.authService.login(this.user).subscribe({
      next: data => { 
        this.authService.storeToken(data);     //Store token in browser
        this.authService.updateUser(this.user.username);
        console.log(`POST login: ${JSON.stringify(data)}`);
        this.router.navigate(['/']);
      },
      error: error => {
        if(error.status == 401)
          this.feedback.set('* Erroneous user and/or password');
        else 
          this.router.navigate(['error']);
        console.log('HTTP error code:', error.status);
      }
    }); 
  };
}
