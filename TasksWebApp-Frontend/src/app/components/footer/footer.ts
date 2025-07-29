import { DatePipe } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ImageIcon } from "../image-icon/image-icon";

@Component({
  selector: 'app-footer',
  imports: [DatePipe, ImageIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  author = input('');
  authorContact = input('');
  imageMail = signal('bt_gmail.png');
  altMail = signal('contact me');
  authorLinkedin = input('');
  imageLinkedin = signal('bt_linkedin.png');
  altLinkedin = signal('my profile');
  authorGitHub = input('');
  imageGithub = signal('bt_github.png');
  altGithub = signal('my repositories');
  today = input(new Date());
}
