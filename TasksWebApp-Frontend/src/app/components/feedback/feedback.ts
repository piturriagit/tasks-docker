import { Component, input } from '@angular/core';

@Component({
  selector: 'app-feedback',
  imports: [],
  templateUrl: './feedback.html',
  styleUrl: './feedback.css'
})
export class Feedback {
  image = input("");
  title = input("");
  message = input("");
  warning = input("");
  link = input("");
}
