import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from '../components/feedback/feedback';

@Component({
  selector: 'app-error',
  imports: [Feedback],
  templateUrl: './error.html',
  styleUrl: './error.css'
})
export class Error {
  ticket = signal('mailto:patricia.iturriaganez@gmail.com?subject=Task%20Manager%20[Incident]%20-%20');
  protected readonly image = signal('sorry.png');
  protected readonly title = signal('Looks like our server is down');
  protected readonly message = signal('Grab a coffee with cookies and check back with us in a bit.');
  protected readonly warning = signal('You can also create a ticket if you need additional help with this');
  
  constructor(private router: Router) {
    setTimeout(()=> {
      this.router.navigate(['/']);
    }, 1000 * 3600);    //try to redirect to main page every 1 hour
  }
}
