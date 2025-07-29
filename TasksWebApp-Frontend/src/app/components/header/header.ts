import { Component, input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ImageIcon } from "../image-icon/image-icon";
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ImageIcon],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  
  authImage = signal('bt_auth.png');
  authAlt = signal('Logout');
  appName = input('');
  loggedUser = '';

  constructor(private authService: AuthService, 
    private router: Router) { 
  }

  ngOnInit(): void {
    this.authService.loggedUser$.subscribe(user => {
      this.loggedUser = user;
    });
  }

  onLogout() {
    console.log(`logout... `);
    this.authService.deleteToken();        //Remove token from browser
    this.loggedUser='';
    this.router.navigate(['login']);
  };
}