import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly appName = signal('My Tasks');
  protected readonly author = signal('piturria');
  protected readonly authorContact = signal('mailto:patricia.iturriaganez@gmail.com?subject=Task%20Manager%20-%20');
  protected readonly authorLinkedin = signal('https://www.linkedin.com/in/patricia-iturriaga-n%C3%BA%C3%B1ez-726258134');
  protected readonly authorGitHub = signal('https://github.com/piturriagit');
  
  today = signal(new Date('2025/07/29'));
  constructor() {
    setInterval(()=>{
      this.today.set(new Date());
    }, 1000 * 3600);    //updated every hour
  }
}
