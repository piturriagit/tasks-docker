import { Component, signal } from '@angular/core';
import { Feedback } from "../components/feedback/feedback";
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [Feedback],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  ticket = signal('mailto:patricia.iturriaganez@gmail.com?subject=Task%20Manager%20[Incident]%20-%20');
  protected readonly image = signal('notfound.png');
  protected readonly title = signal('Oops!');
  protected readonly message = signal("We can't seem to find the page you're looking for.");
  protected readonly warning = signal('Error code 404');

  constructor(private router: Router) {
    setTimeout(()=> {
      this.router.navigate(['/']);
    }, 1000 * 5);    //try to redirect to main page every 1 hour
  }
}
